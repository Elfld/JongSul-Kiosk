# API 연동 구현 계획서

## 현재 상태 분석

### Mock 함수 사용 현황

| 파일 | Mock 함수 | 용도 |
|------|-----------|------|
| `src/app/register/page.tsx` | `mockAnalysis()` | 등록 처리 시뮬레이션 |
| `src/app/retrieve/page.tsx` | `mockVerifyCode()` | 픽업코드 검증 시뮬레이션 |

### 현재 플로우

```
등록: wait → insert → processing → confirm → complete
수령: input → verifying → error/locker → complete
```

---

## 구현 작업 목록

### 1단계: API 서비스 레이어 구축

**파일:** `src/lib/api/kiosk.ts` (신규)

```ts
// 구현할 함수들
export const kioskApi = {
  pickup: (pickupCode: string) => Promise<KioskPickupResponse>,
  closeLocker: (pickupCode: string) => Promise<LockerCloseResponse>,
  registerRequest: (deviceName: string, location?: string) => Promise<void>,
  openLocker: (params: LockerOpenRequest) => Promise<LockerOpenResponse>,
};
```

### 2단계: 타입 정의 업데이트

**파일:** `src/lib/types/kiosk.ts`

추가할 타입:
- `PickupRequest`, `KioskPickupResponse`
- `LockerCloseRequest`, `LockerCloseResponse`
- `ItemRegisterRequest`
- `LockerOpenRequest`, `LockerOpenResponse`
- `ItemResponse`, `TagResponse`

### 3단계: 환경 설정

**파일:** `.env.local` 또는 `src/lib/config.ts`

```ts
// 필요한 설정값
DEVICE_NAME: string  // 키오스크 장비명 (예: "kiosk-1")
API_BASE_URL: string // 백엔드 API 주소
```

---

## 페이지별 수정 사항

### 수령 페이지 (`src/app/retrieve/page.tsx`)

| 단계 | 현재 | 변경 후 |
|------|------|---------|
| verifying | `mockVerifyCode()` | `kioskApi.pickup()` |
| locker | 타이머만 표시 | 타이머 + `kioskApi.closeLocker()` 호출 |

**상세 변경:**

1. **verifying 단계**
   - `mockVerifyCode(pinCode)` → `kioskApi.pickup(pinCode)`
   - 성공 시: `item.locker_id` 저장, locker 단계로
   - 실패 시: error 단계로

2. **locker 단계** (LockerScreen)
   - "닫기" 버튼 클릭 또는 타이머 만료 시 `kioskApi.closeLocker()` 호출
   - 현재 `pickup_code`를 state로 보관 필요

### 등록 페이지 (`src/app/register/page.tsx`)

| 단계 | 현재 | 변경 후 |
|------|------|---------|
| insert | 버튼만 존재 | `kioskApi.openLocker(open_chute: true)` 호출 |
| processing | `mockAnalysis()` | `kioskApi.registerRequest()` 호출 |

**상세 변경:**

1. **insert 단계** (InsertScreen)
   - 화면 진입 시 또는 버튼 클릭 시 투입구 열기
   - `kioskApi.openLocker({ device_name, open_chute: true })`

2. **processing 단계**
   - `mockAnalysis()` → `kioskApi.registerRequest(device_name, location)`
   - 응답이 빈 객체이므로, 성공 여부만 확인
   - confirm 단계에서 보여줄 `itemData`는 별도 처리 필요 (백엔드 확인 필요)

---

## 구현 순서

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: 기반 작업                                           │
├─────────────────────────────────────────────────────────────┤
│ 1. 타입 정의 추가 (kiosk.ts)                                 │
│ 2. API 서비스 함수 구현 (kiosk.ts 신규)                       │
│ 3. 환경 변수 설정 (DEVICE_NAME)                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: 수령 플로우 연동                                     │
├─────────────────────────────────────────────────────────────┤
│ 4. retrieve/page.tsx - pickup API 연동                       │
│ 5. LockerScreen - closeLocker API 연동                       │
│ 6. 에러 처리 개선 (ErrorScreen)                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: 등록 플로우 연동                                     │
├─────────────────────────────────────────────────────────────┤
│ 7. InsertScreen - openLocker (chute) API 연동                │
│ 8. register/page.tsx - registerRequest API 연동              │
│ 9. 등록 결과 처리 (백엔드 응답 구조에 따라)                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 4: 마무리                                              │
├─────────────────────────────────────────────────────────────┤
│ 10. Mock 함수 제거                                           │
│ 11. 전체 플로우 테스트                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 파일별 작업 체크리스트

### 신규 생성

- [ ] `src/lib/api/kiosk.ts` - Kiosk API 서비스

### 수정

- [ ] `src/lib/types/kiosk.ts` - 타입 정의 추가
- [ ] `src/app/retrieve/page.tsx` - pickup API 연동
- [ ] `src/app/register/page.tsx` - register API 연동
- [ ] `src/components/kiosk/retrieve/LockerScreen.tsx` - closeLocker API
- [ ] `src/components/kiosk/register/InsertScreen.tsx` - openLocker API

### 삭제/정리

- [ ] `src/lib/utils/kiosk.ts` - mockAnalysis, mockVerifyCode 제거

---

## 주의사항

### 1. device_name 관리

```ts
// 환경 변수로 관리
const DEVICE_NAME = process.env.NEXT_PUBLIC_DEVICE_NAME || 'kiosk-1';
```

### 2. 에러 처리

API 명세에 에러 코드가 명시되지 않음. 예상되는 에러:
- 422: Validation Error
- 400/404: 픽업코드 만료/사용됨 (추정)

```ts
try {
  const result = await kioskApi.pickup(code);
  // 성공 처리
} catch (error) {
  // 에러 메시지 파싱하여 사용자에게 표시
}
```

### 3. 타이머 로직

LockerScreen에서 타이머 만료 시 자동으로 closeLocker 호출:

```ts
useEffect(() => {
  const timer = setTimeout(() => {
    kioskApi.closeLocker(pickupCode).then(() => {
      onComplete();
    });
  }, 60000); // 60초

  return () => clearTimeout(timer);
}, [pickupCode]);
```

### 4. 등록 결과 데이터

`/kiosk/register/request`는 빈 응답을 반환함.
등록 완료 후 보여줄 아이템 정보는:
- 옵션 A: 별도 API로 최근 등록 아이템 조회
- 옵션 B: 백엔드에서 응답에 아이템 정보 포함하도록 수정 요청
- 옵션 C: confirm 화면에서 아이템 정보 없이 "등록 완료" 만 표시

→ **백엔드 확인 필요**

---

## API Base URL

```ts
// Next.js API Route를 거치지 않고 직접 호출할 경우
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 엔드포인트
`${API_BASE}/main/kiosk/pickup`
`${API_BASE}/main/kiosk/locker/close`
`${API_BASE}/main/kiosk/register/request`
`${API_BASE}/main/kiosk/locker/open`
```

---

## 예상 작업량

| Phase | 작업 | 복잡도 |
|-------|------|--------|
| 1 | 기반 작업 | 낮음 |
| 2 | 수령 플로우 | 중간 |
| 3 | 등록 플로우 | 중간 |
| 4 | 마무리 | 낮음 |

핵심 변경점이 mock → 실제 API 호출로 교체하는 것이므로, 기존 플로우 구조는 그대로 유지됩니다.
