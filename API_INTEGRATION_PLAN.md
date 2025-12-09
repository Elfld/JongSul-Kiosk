# 키오스크 등록 플로우 API 연동 계획서

## 개요
분실물 등록 시 투입구는 상시 열려있으며, 사용자가 등록 버튼을 누르면 즉시 촬영 요청 후 결과를 표시합니다.

## API 스펙

### POST /kiosk/register/request

#### Request
```json
{
  "device_name": "kiosk-1",
  "location": "60주년 기념관"
}
```

#### Response (성공)
```json
{
  "status": "success",
  "message": "처리 완료",
  "category": "카드",
  "image_url": "https://s3.amazonaws.com/..."
}
```

#### Response (실패)
```json
{
  "status": "error",
  "message": "촬영 실패 또는 처리 중 오류",
  "category": null,
  "image_url": null
}
```

## 플로우 구조

### 기존 플로우 (변경 전)
```
wait → insert (투입구 열림 대기) → processing (촬영 요청)
  → confirm (확인 요청: "맞나요?") → complete
```

### 신규 플로우 (변경 후)
```
wait (등록 버튼) → processing (촬영 요청 & 대기) → complete (등록 완료 + 정보 표시)
```

## 화면 구성

### 1. WaitScreen (대기 화면)
- **표시 내용**: "분실물 등록" 타이틀, "등록하기" 버튼
- **동작**:
  - 투입구는 상시 열려있음 (별도 열기 동작 없음)
  - "등록하기" 버튼 클릭 → processing 단계로 이동

### 2. ProcessingScreen (처리 중)
- **표시 내용**: "등록 중..." 로딩 스피너
- **동작**:
  - `POST /kiosk/register/request` 호출
  - 응답 대기 (약 2-5초 예상)
  - 성공 시 → complete 단계로 이동 (응답 데이터 전달)
  - 실패 시 → error 표시 후 wait로 복귀

### 3. CompleteScreen (등록 완료)
- **표시 내용**:
  - 타이틀: "등록 완료"
  - 서브타이틀: "분실물이 등록되었습니다"
  - 카드:
    - 사진: `image_url` (API 응답)
    - 태그: `category` (API 응답)
    - 날짜: `registered_at` (현재 디바이스 시각)
    - 위치: "60주년 기념관" (하드코딩)
  - 버튼: "새로운 등록", "처음 화면으로"
- **동작**:
  - 5초 후 자동으로 처음 화면으로 복귀
  - 또는 버튼으로 수동 이동

## TypeScript 타입 정의

```typescript
// API Request
export interface ItemRegisterRequest {
  device_name: string;
  location: string;
}

// API Response
export interface ItemRegisterResponse {
  status: 'success' | 'error';
  message: string;
  category: string | null;
  image_url: string | null;
}

// UI 표시용 데이터
export interface RegisteredItemData {
  photoUrl: string;
  category: string;
  registeredAt: string;  // ISO 8601 format
  location: string;
}
```

## 에러 처리

### API 호출 실패 시
- 네트워크 오류: "서버에 연결할 수 없습니다"
- 타임아웃: "처리 시간이 초과되었습니다"
- 서버 에러: API 응답의 `message` 표시

### 예외 상황
- `status: "error"` 응답: `message`를 사용자에게 표시
- `image_url`이 null: 기본 이미지 또는 아이콘 표시
- `category`가 null: "기타" 또는 "분류 중" 표시

## 데이터 흐름

```
[사용자]
  ↓ 등록하기 버튼 클릭
[WaitScreen]
  ↓ setStep('processing')
[ProcessingScreen]
  ↓ POST /kiosk/register/request
[서버]
  ↓ MQTT → 라즈베리파이
[라즈베리파이]
  ↓ 촬영 + S3 업로드 + AI 분석
[서버]
  ↓ Response: { status, message, category, image_url }
[ProcessingScreen]
  ↓ setStep('complete'), 응답 데이터 저장
[CompleteScreen]
  ↓ 등록 완료 정보 표시
```

## 구현 우선순위

### Phase 1: 기본 구현 (현재 작업)
- [x] 타입 정의 업데이트
- [x] API 함수 응답 타입 변경
- [ ] 플로우 단순화 (wait → processing → complete)
- [ ] CompleteScreen UI 변경

### Phase 2: 개선사항 (추후)
- [ ] 재시도 로직 추가 (최대 3회)
- [ ] 타임아웃 설정 (30초)
- [ ] 오프라인 모드 대응
- [ ] 로깅 및 에러 추적

## 테스트 시나리오

### 정상 케이스
1. 사용자가 "등록하기" 버튼 클릭
2. 로딩 화면 표시 (2-5초)
3. 등록 완료 화면에 사진, 카테고리, 날짜, 위치 표시
4. 5초 후 자동으로 처음 화면으로 복귀

### 에러 케이스
1. 네트워크 오류 → "서버에 연결할 수 없습니다" 표시 후 재시도 옵션
2. API 에러 응답 → 서버 메시지 표시 후 재시도 옵션
3. 타임아웃 → "처리 시간 초과" 표시 후 재시도 옵션

## 환경 변수

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEVICE_NAME=kiosk-1
NEXT_PUBLIC_LOCATION=60주년 기념관
```

## 참고사항

- 투입구는 상시 열려있으므로 별도 개폐 제어 불필요
- 등록은 즉시 완료되며 확인 절차 없음
- 사용자는 등록 완료 후 결과만 확인
- 위치는 "60주년 기념관"으로 고정 (환경 변수로 관리 가능)
