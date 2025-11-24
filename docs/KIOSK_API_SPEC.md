# Kiosk API 명세서

키오스크 프론트엔드에서 사용할 API 목록입니다.

## Base URL

```
/main
```

---

## 사용할 API 목록

| API | 메서드 | 용도 |
|-----|--------|------|
| `/kiosk/pickup` | POST | 수령 - 픽업코드 검증 (성공 시 사물함 자동 오픈) |
| `/kiosk/locker/close` | POST | 사물함 닫기 |
| `/kiosk/register/request` | POST | 등록 - 촬영 요청 |
| `/kiosk/locker/open` | POST | 투입구/사물함 열기 |

### 제외 API

| API | 이유 |
|-----|------|
| `/locker/open/{locker_id}` | 서버 내부에서 처리 |

---

## 1. POST /kiosk/pickup

픽업 코드 확인 및 사물함 열기

### 설명
- 6자리 픽업 코드를 검증하고 아이템을 '찾음' 상태로 갱신
- 검증 성공 시 할당된 사물함 번호(`item.locker_id`)와 기기(`item.device_name`)를 찾아 **자동으로 사물함을 열어줌**
- 코드가 만료되었거나 이미 사용된 경우 HTTP 오류 반환

### Request

```ts
interface PickupRequest {
  pickup_code: string  // 필수, 6자리 픽업 코드
}
```

### Response 200

```ts
interface KioskPickupResponse {
  message: string      // 필수
  item: ItemResponse   // 필수
}
```

### 사용 시점
- 수령 페이지에서 6자리 코드 입력 후 확인 버튼 클릭 시

---

## 2. POST /kiosk/locker/close

사물함 닫기 (버튼/타이머)

### 설명
- 닫기 버튼을 눌렀거나 로컬 타이머가 만료되었을 때 호출
- 픽업 코드로 아이템을 찾아 연결된 `locker_id`·`device_name`으로 IoT CLOSE 명령 발행
- **아이템 상태는 변경하지 않고, 문 닫기만 수행**

### Request

```ts
interface LockerCloseRequest {
  pickup_code: string  // 필수
}
```

### Response 200

```ts
interface LockerCloseResponse {
  message: string      // 필수
  locker_id: number    // 필수 (NOT nullable)
  device_name: string  // 필수
}
```

### 사용 시점
- 수령 완료 후 "닫기" 버튼 클릭 시
- 또는 타이머 만료 시 자동 호출

---

## 3. POST /kiosk/register/request

분실물 등록 촬영 요청

### 설명
- 라즈베리파이(IoT 디바이스)에게 촬영/업로드를 지시
- 서버는 `locker/register/{device_name}` 토픽으로 MQTT 메시지 발행
- 응답으로 AWS Request ID를 돌려줌 (단, 스키마 미정의 - 빈 응답 처리)

### Request

```ts
interface ItemRegisterRequest {
  device_name: string       // 필수, 장비 이름
  location?: string | null  // 선택, 수거 위치
}
```

### Response 200

```ts
// 빈 응답 (스키마 미정의)
// description에서는 AWS Request ID를 반환한다고 하나 스키마 누락
{}
```

### 사용 시점
- 등록 페이지에서 물건 투입 후 촬영 시작 시

---

## 4. POST /kiosk/locker/open

투입구/사물함 열기

### 설명
- `open_chute=true`: 투입구 전용 토픽(`locker/chute/{device_name}`)으로 OPEN_CHUTE 명령 발행
- `open_chute=false`: `locker_id`가 필수이며, 해당 사물함 문을 여는 MQTT 명령 발행

### Request

```ts
interface LockerOpenRequest {
  device_name: string            // 필수
  locker_id?: number | null      // open_chute=false일 때 필수
  open_chute?: boolean           // 기본값: false
}
```

### Response 200

```ts
interface LockerOpenResponse {
  message: string                // 필수
  locker_id: number | null       // 필수 (nullable - 투입구 열 때는 null)
  device_name: string            // 필수
  aws_request_id?: string | null // 선택
}
```

### 사용 시점
- 등록 페이지에서 투입구 열기 버튼 클릭 시 (`open_chute: true`)

---

## 공통 타입

### ItemResponse

```ts
interface ItemResponse {
  id: number                        // 필수
  photo_url: string                 // 필수
  location?: string | null          // 선택
  locker_id?: number | null         // 선택
  device_name?: string | null       // 선택
  status: string                    // 필수
  registered_at: string             // 필수 (ISO datetime)
  tags: TagResponse[]               // 기본값: []
}
```

### TagResponse

```ts
interface TagResponse {
  id: number    // 필수
  name: string  // 필수
}
```

### HTTPValidationError (422)

```ts
interface HTTPValidationError {
  detail: ValidationError[]
}

interface ValidationError {
  loc: (string | number)[]
  msg: string
  type: string
}
```

---

## 플로우

### 등록 플로우

```
1. 사용자가 "등록하기" 선택
   ↓
2. POST /kiosk/locker/open (open_chute: true)
   → 투입구 열림
   ↓
3. 사용자가 물건 투입
   ↓
4. POST /kiosk/register/request
   → 라즈베리파이에 촬영 명령 전송
   ↓
5. (서버가 사진 촬영/저장 처리)
   ↓
6. 등록 완료 화면 표시
```

### 수령 플로우

```
1. 사용자가 "수령하기" 선택
   ↓
2. 6자리 픽업 코드 입력
   ↓
3. POST /kiosk/pickup
   → 코드 검증 + 사물함 자동 오픈
   ↓
4. 물건 수령
   ↓
5. "닫기" 버튼 클릭 또는 타이머 만료
   ↓
6. POST /kiosk/locker/close
   → 사물함 닫기
   ↓
7. 완료 화면 표시
```

---

## 구현 시 참고사항

### device_name
- 키오스크가 연결된 라즈베리파이/장비 이름
- 환경 변수 또는 설정 파일에서 관리 필요
- 예: `"kiosk-1"`, `"inha-locker-01"`

### 에러 처리
- 422: Validation Error (요청 형식 오류)
- 그 외 에러 코드는 명세서에 명시되지 않음
- `/kiosk/pickup` description에서 "코드가 만료되었거나 이미 사용된 경우 상황에 맞는 HTTP 오류 반환" 언급
  - 400, 404 등 예상되나 명시되지 않음 → 백엔드 확인 필요

### 타이머
- 수령 시 사물함 열림 후 일정 시간 경과 시 자동으로 `/kiosk/locker/close` 호출 필요
- 타이머 시간은 프론트에서 결정 (예: 60초)
