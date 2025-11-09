# 키오스크 플로우 다이어그램

> 화면 전환, 상태 관리, 사용자 액션 흐름도

---

## 🗺️ 전체 플로우 개요

```
┌─────────────────────────────────────────────────────────────┐
│                        초기 화면                              │
│                       /kiosk                                 │
│                                                              │
│              [분실물 등록]  [분실물 찾기]                      │
└──────────┬───────────────────────────┬──────────────────────┘
           │                           │
           ▼                           ▼
    ┌──────────────┐          ┌──────────────┐
    │  등록 플로우   │          │  찾기 플로우   │
    │   (5단계)     │          │   (5단계)     │
    └──────────────┘          └──────────────┘
```

---

## 📦 등록 플로우 (Register Flow)

### 플로우 다이어그램

```
START: /kiosk
  │
  │ [분실물 등록 버튼 클릭]
  ▼
┌────────────────────────────────────┐
│   1. 등록 대기 화면                  │
│   /kiosk/register                  │
│                                    │
│   - 타이틀: "분실물 등록"            │
│   - 박스 아이콘 (비어있음)           │
│   - [시작하기] 버튼                 │
│   - [처음 화면으로] 버튼             │
└────────────┬───────────────────────┘
             │ [시작하기 클릭]
             ▼
┌────────────────────────────────────┐
│   2. 투입 화면                      │
│   /kiosk/register/insert           │
│                                    │
│   - 타이틀: "투입구가 열렸습니다"    │
│   - 박스 아이콘 (열린 상태)         │
│   - [투입 완료] 버튼                │
└────────────┬───────────────────────┘
             │ [투입 완료 클릭]
             ▼
┌────────────────────────────────────┐
│   3. 분석 중 화면                   │
│   /kiosk/register/processing       │
│                                    │
│   - 타이틀: "분석 중"               │
│   - 로딩 스피너                     │
│   - (자동 진행, 2초 대기)            │
└────────────┬───────────────────────┘
             │ [분석 완료 (자동)]
             ▼
┌────────────────────────────────────┐
│   4. 정보 확인 화면                 │
│   /kiosk/register/confirm          │
│                                    │
│   - 타이틀: "등록 정보 확인"         │
│   - 사진, 태그, 날짜, 위치          │
│   - [네, 맞아요] 버튼               │
│   - [아니요, 다시 할게요] 버튼       │
└────────┬────────────┬──────────────┘
         │ [네]        │ [아니요]
         │             └──────┐
         ▼                    │
┌────────────────────────┐    │
│   5. 등록 완료 화면      │    │
│   /kiosk/register/     │    │
│        complete        │    │
│                        │    │
│   - 체크 아이콘         │    │
│   - "등록 완료"         │    │
│   - [새로운 등록] 버튼   │    │
│   - 5초 자동 복귀       │    │
└───┬────────────────────┘    │
    │ [5초 후 자동 OR        │
    │  새로운 등록 클릭]      │
    ▼                        │
  초기 화면 (/kiosk) ◀────────┘
```

### 상태 관리

```typescript
// 등록 플로우 상태
type RegisterStep =
  | 'wait'        // 대기
  | 'insert'      // 투입
  | 'processing'  // 분석 중
  | 'confirm'     // 확인
  | 'complete';   // 완료

interface RegisterState {
  step: RegisterStep;
  itemData: {
    photoUrl?: string;
    tags?: string[];
    foundDate?: string;
    location?: string;
  } | null;
  isLoading: boolean;
  error?: string;
}
```

### 액션 흐름

```typescript
// 1. 대기 → 투입
function handleStart() {
  router.push('/kiosk/register/insert');
}

// 2. 투입 → 분석 중
function handleInsertComplete() {
  router.push('/kiosk/register/processing');
  // 동시에 분석 시작
  analyzeItem();
}

// 3. 분석 중 → 확인 (자동)
async function analyzeItem() {
  await delay(2000); // 시뮬레이션
  const data = await mockAnalysis();
  router.push('/kiosk/register/confirm');
}

// 4-A. 확인 → 완료
function handleConfirm() {
  router.push('/kiosk/register/complete');
}

// 4-B. 확인 → 대기 (다시 하기)
function handleRetry() {
  router.push('/kiosk/register');
}

// 5. 완료 → 초기 화면
function handleComplete() {
  router.push('/kiosk');
}
```

---

## 🔍 찾기 플로우 (Retrieve Flow)

### 플로우 다이어그램

```
START: /kiosk
  │
  │ [분실물 찾기 버튼 클릭]
  ▼
┌────────────────────────────────────┐
│   1. 코드 입력 화면                 │
│   /kiosk/retrieve                  │
│                                    │
│   - 6자리 PIN 입력 박스             │
│   - 숫자 키패드                     │
│   - [확인] 버튼                     │
│   - [처음 화면으로] 버튼             │
└────────────┬───────────────────────┘
             │ [확인 버튼 클릭]
             ▼
┌────────────────────────────────────┐
│   2. 확인 중 화면                   │
│   /kiosk/retrieve/verifying        │
│                                    │
│   - 타이틀: "코드 확인 중"          │
│   - 로딩 스피너                     │
│   - (자동 진행, 1-2초 대기)         │
└────────┬───────────────────────────┘
         │ [API 응답]
         │
    ┌────┴────┐
    │         │
    ▼         ▼
   실패      성공
    │         │
    │         ▼
    │    ┌────────────────────────────┐
    │    │   4. 사물함 개방 화면        │
    │    │   /kiosk/retrieve/locker   │
    │    │                            │
    │    │   - 자물쇠 아이콘           │
    │    │   - "사물함 X번 열렸습니다"  │
    │    │   - [수령 완료] 버튼        │
    │    └─────┬──────────────────────┘
    │          │ [수령 완료 클릭]
    ▼          ▼
┌────────────────────────────────────┐
│   3. 오류 화면                      │
│   /kiosk/retrieve/error            │
│                                    │
│   - 경고 아이콘                     │
│   - "코드를 확인해주세요"            │
│   - [다시 시도] 버튼                │
└────────┬───────────────────────────┘
         │ [다시 시도 클릭]
         └──────┐
                │
                ▼
        코드 입력 화면 (1번)
                │
                ▼
┌────────────────────────────────────┐
│   5. 완료 화면                      │
│   /kiosk/retrieve/complete         │
│                                    │
│   - 축하 아이콘                     │
│   - "이용해 주셔서 감사합니다"       │
│   - 5초 자동 복귀                   │
└────────┬───────────────────────────┘
         │ [5초 후 자동]
         ▼
    초기 화면 (/kiosk)
```

### 상태 관리

```typescript
// 찾기 플로우 상태
type RetrieveStep =
  | 'input'       // 코드 입력
  | 'verifying'   // 확인 중
  | 'error'       // 오류
  | 'locker'      // 사물함 개방
  | 'complete';   // 완료

interface RetrieveState {
  step: RetrieveStep;
  pinCode: string;
  lockerNumber?: number;
  isLoading: boolean;
  error?: string;
  attemptCount: number;
}
```

### 액션 흐름

```typescript
// 1. 코드 입력 → 확인 중
function handleConfirm(pinCode: string) {
  if (pinCode.length !== 6) return;
  
  router.push('/kiosk/retrieve/verifying');
  verifyCode(pinCode);
}

// 2-A. 확인 중 → 사물함 개방 (성공)
async function verifyCode(code: string) {
  const result = await api.verifyPickupCode(code);
  
  if (result.success) {
    router.push('/kiosk/retrieve/locker');
  } else {
    router.push('/kiosk/retrieve/error');
  }
}

// 2-B. 확인 중 → 오류 (실패)
// (위 verifyCode 함수에서 처리)

// 3. 오류 → 코드 입력 (다시 시도)
function handleRetry() {
  router.push('/kiosk/retrieve');
}

// 4. 사물함 개방 → 완료
function handlePickupComplete() {
  router.push('/kiosk/retrieve/complete');
}

// 5. 완료 → 초기 화면
function handleComplete() {
  router.push('/kiosk');
}
```

---

## 🔄 공통 전환 패턴

### 1. 자동 복귀 (Auto Return)

```typescript
// 완료 화면에서 자동으로 초기 화면으로
useEffect(() => {
  const timer = setTimeout(() => {
    router.push('/kiosk');
  }, 5000);

  return () => clearTimeout(timer);
}, []);
```

**적용 화면:**
- `/kiosk/register/complete`
- `/kiosk/retrieve/complete`

### 2. 로딩 자동 진행

```typescript
// 로딩 화면에서 처리 후 자동 이동
useEffect(() => {
  async function process() {
    const result = await someApiCall();
    router.push(nextRoute);
  }
  
  process();
}, []);
```

**적용 화면:**
- `/kiosk/register/processing`
- `/kiosk/retrieve/verifying`

### 3. 뒤로 가기 방지

```typescript
// 키오스크 페이지에서는 브라우저 뒤로가기 막기
useEffect(() => {
  window.history.pushState(null, '', window.location.href);
  
  const handlePopState = () => {
    window.history.pushState(null, '', window.location.href);
  };
  
  window.addEventListener('popstate', handlePopState);
  
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, []);
```

---

## 🎯 라우팅 구조

### 파일 구조
```
src/app/kiosk/
├── page.tsx                      # 초기 화면
├── layout.tsx                    # 공통 레이아웃
│
├── register/
│   ├── page.tsx                  # 등록 대기
│   ├── insert/
│   │   └── page.tsx              # 투입
│   ├── processing/
│   │   └── page.tsx              # 분석 중
│   ├── confirm/
│   │   └── page.tsx              # 정보 확인
│   └── complete/
│       └── page.tsx              # 등록 완료
│
└── retrieve/
    ├── page.tsx                  # 코드 입력
    ├── verifying/
    │   └── page.tsx              # 확인 중
    ├── error/
    │   └── page.tsx              # 코드 오류
    ├── locker/
    │   └── page.tsx              # 사물함 개방
    └── complete/
        └── page.tsx              # 완료
```

### URL 매핑
```
/kiosk                          → 초기 화면
/kiosk/register                 → 등록 대기
/kiosk/register/insert          → 투입
/kiosk/register/processing      → 분석 중
/kiosk/register/confirm         → 정보 확인
/kiosk/register/complete        → 등록 완료

/kiosk/retrieve                 → 코드 입력
/kiosk/retrieve/verifying       → 확인 중
/kiosk/retrieve/error           → 코드 오류
/kiosk/retrieve/locker          → 사물함 개방
/kiosk/retrieve/complete        → 완료
```

---

## 📊 상태 전환 다이어그램

### 등록 플로우 상태 전환

```
     START
       │
       ▼
    [wait] ──────────┐
       │             │
       ▼             │
   [insert]          │
       │             │
       ▼             │ [처음 화면으로]
  [processing]       │
       │             │
       ▼             │
   [confirm] ────────┤
     │    │          │
     │    └─[retry]──┘
     ▼
  [complete]
     │
     ▼
    END
```

### 찾기 플로우 상태 전환

```
     START
       │
       ▼
    [input] ──────────┐
       │              │
       ▼              │
  [verifying]         │
    │    │            │
    │    ▼            │ [처음 화면으로]
    │  [error]────────┤
    │                 │
    ▼                 │
  [locker]            │
       │              │
       ▼              │
  [complete]──────────┘
       │
       ▼
      END
```

---

## 🔐 에러 처리

### 에러 시나리오

1. **네트워크 오류**
   ```
   [처리 중] → 3초 타임아웃 → [에러 화면]
   ```

2. **잘못된 코드**
   ```
   [코드 확인] → API 400 → [에러 화면]
   ```

3. **시스템 오류**
   ```
   [분석 중] → API 500 → [에러 화면]
   ```

### 에러 화면 구성

```typescript
interface ErrorScreenProps {
  title: string;
  message: string;
  onRetry: () => void;
  onHome: () => void;
}

// 예시
<ErrorScreen
  title="오류가 발생했습니다"
  message="잠시 후 다시 시도해주세요"
  onRetry={() => router.push('/kiosk/register')}
  onHome={() => router.push('/kiosk')}
/>
```

---

## ⏱️ 타이밍 명세

| 화면 | 대기 시간 | 자동 전환 |
|-----|----------|----------|
| 분석 중 | 2초 | ✅ |
| 코드 확인 중 | 1-2초 | ✅ |
| 등록 완료 | 5초 | ✅ |
| 찾기 완료 | 5초 | ✅ |
| 에러 화면 | - | ❌ |

---

## 🎬 애니메이션 전환

### 페이지 전환
```typescript
// 기본 fade 전환
const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};
```

### 프로그레스 바
```typescript
// 1초마다 20% 증가 (5초 = 100%)
style={{ 
  width: `${progress}%`,
  transition: 'width 1s linear'
}}
```

### 로딩 스피너
```typescript
// 기존 LoadingSpinner 컴포넌트 사용
<LoadingSpinner />
```

---

## 🧪 테스트 시나리오

### 등록 플로우 Happy Path
```
1. 초기 화면 진입
2. "분실물 등록" 클릭
3. "시작하기" 클릭
4. "투입 완료" 클릭
5. 2초 대기 (자동)
6. "네, 맞아요" 클릭
7. 5초 대기 (자동 복귀)
8. 초기 화면 도착 ✅
```

### 찾기 플로우 Happy Path
```
1. 초기 화면 진입
2. "분실물 찾기" 클릭
3. 6자리 코드 입력
4. "확인" 클릭
5. 1-2초 대기 (자동)
6. "수령 완료" 클릭
7. 5초 대기 (자동 복귀)
8. 초기 화면 도착 ✅
```

### 에러 처리 Path
```
1. 찾기 플로우 진입
2. 잘못된 코드 입력
3. 에러 화면 표시
4. "다시 시도" 클릭
5. 코드 입력 화면 복귀 ✅
```

---

**이 플로우를 따르면 사용자가 직관적으로 키오스크를 사용할 수 있습니다.**
