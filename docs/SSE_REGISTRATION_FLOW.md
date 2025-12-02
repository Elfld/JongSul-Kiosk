# SSE 기반 등록 플로우 설명

## 현재 구조의 문제점

### 기존 방식 (HTTP Request/Response)

```
[키오스크] → POST /kiosk/register/request → [서버]
                                              ↓
                                          200 OK (빈 응답)
                                              ↓
[키오스크] ❌ 연결 종료                        ↓
                                          MQTT 명령 전송
                                              ↓
                                        [라즈베리 파이]
                                              ↓
                                          촬영 + 업로드
                                              ↓
                                          AI 분석
                                              ↓
                                          DB 저장
                                              ↓
                                          게시판 등록 완료

[키오스크] ❓ 결과를 알 수 없음
```

**문제점:**
1. **Fire-and-Forget**: API 호출 후 결과를 알 수 없음
2. **사용자 피드백 부재**: "처리 중입니다" 이후 언제 끝나는지 모름
3. **에러 처리 불가**: 촬영 실패, AI 분석 실패 등을 사용자에게 알릴 수 없음
4. **타임아웃 위험**: 전체 플로우가 길어지면 HTTP 타임아웃 발생 가능
5. **UI/UX 문제**: 사용자는 완료 확인을 할 수 없어 불안감 증가

---

## SSE(Server-Sent Events)란?

**서버에서 클라이언트로 실시간 단방향 이벤트 스트리밍**

- 서버가 연결을 유지하면서 지속적으로 데이터 전송
- WebSocket과 달리 단방향 (서버 → 클라이언트)
- HTTP 기반이라 방화벽 문제 없음
- 자동 재연결 기능 내장
- EventSource API 사용 (브라우저 표준)

### SSE vs 기타 방식

| 방식 | 장점 | 단점 | 적합한 경우 |
|------|------|------|------------|
| **Polling** | 구현 간단 | 서버 부하 높음, 지연 발생 | 거의 없음 |
| **Long Polling** | Polling보다 효율적 | 여전히 비효율적 | 레거시 지원 |
| **WebSocket** | 양방향, 실시간 | 복잡함, 방화벽 문제 | 채팅, 게임 |
| **SSE** | 단순, 자동 재연결, HTTP 기반 | 단방향만 가능 | **진행 상황 알림** ⭐ |

---

## SSE 적용 후 플로우

```
[키오스크] → GET /kiosk/register/stream (SSE 연결)
                ↓
            연결 유지 🔄
                ↓
[서버] → event: status
         data: {"stage": "chute_opened", "message": "투입구가 열렸습니다"}
                ↓
[키오스크] → UI 업데이트: "물건을 투입해주세요"
                ↓
[서버] → event: status
         data: {"stage": "capturing", "message": "촬영 중입니다"}
                ↓
[키오스크] → UI 업데이트: "📷 촬영 중..."
                ↓
[서버] → event: status
         data: {"stage": "uploading", "message": "사진 업로드 중", "progress": 50}
                ↓
[키오스크] → UI 업데이트: 진행률 바 50%
                ↓
[서버] → event: status
         data: {"stage": "analyzing", "message": "AI 분석 중입니다"}
                ↓
[키오스크] → UI 업데이트: "🤖 분석 중..."
                ↓
[서버] → event: complete
         data: {"item_id": 123, "tags": ["휴대폰"], "photo_url": "..."}
                ↓
[키오스크] → 확인 화면으로 이동 (실제 데이터 표시)
                ↓
            연결 종료 ✅

// 에러 발생 시
[서버] → event: error
         data: {"stage": "capturing", "error": "카메라 연결 실패"}
                ↓
[키오스크] → 에러 화면 표시
```

---

## 백엔드가 SSE를 선택한 이유

### 1. **장시간 처리의 위험성 해소**

4개 엔드포인트를 직렬 연결하면:
- **키오스크 → 서버 → 라즈베리파이 → AI → DB**
- 총 소요 시간: 10~30초 이상
- HTTP 타임아웃 발생 위험
- 중간에 하나라도 실패하면 전체 실패

SSE 사용 시:
- 연결을 계속 유지하므로 타임아웃 없음
- 각 단계별로 독립적 처리 가능
- 실패 시 어느 단계에서 실패했는지 명확히 알 수 있음

### 2. **비동기 처리의 투명성 확보**

- MQTT는 본질적으로 비동기
- 라즈베리파이가 언제 응답할지 예측 불가
- SSE로 "대기 중" 상태를 실시간 전달 가능

### 3. **사용자 경험 개선**

- 각 단계마다 피드백 제공
- 진행률 표시 가능
- 사용자가 기다리는 이유를 알 수 있음
- "먹통" 느낌 제거

---

## 프론트엔드 구현 가이드

### 1. EventSource API 사용

```typescript
// src/lib/api/kiosk.ts

export async function registerWithStream(
  onProgress: (event: RegistrationEvent) => void,
  onComplete: (data: KioskItemData) => void,
  onError: (error: string) => void
): Promise<() => void> {
  const url = `${API_BASE_URL}${API_PREFIX}/kiosk/register/stream`;
  const eventSource = new EventSource(url);

  // 진행 상황 이벤트
  eventSource.addEventListener('status', (e) => {
    const data = JSON.parse(e.data);
    onProgress({
      stage: data.stage,
      message: data.message,
      progress: data.progress,
    });
  });

  // 완료 이벤트
  eventSource.addEventListener('complete', (e) => {
    const data = JSON.parse(e.data);
    onComplete({
      id: data.item_id,
      photoUrl: data.photo_url,
      tags: data.tags,
      foundDate: data.found_date,
      location: data.location,
    });
    eventSource.close();
  });

  // 에러 이벤트
  eventSource.addEventListener('error', (e) => {
    const data = JSON.parse(e.data);
    onError(data.error || '알 수 없는 오류');
    eventSource.close();
  });

  // 연결 에러 (네트워크 끊김 등)
  eventSource.onerror = () => {
    onError('서버 연결이 끊어졌습니다');
    eventSource.close();
  };

  // 취소 함수 반환
  return () => eventSource.close();
}
```

### 2. React 컴포넌트에서 사용

```typescript
// src/app/kiosk/register/page.tsx

type ProcessingStage =
  | 'chute_opened'
  | 'capturing'
  | 'uploading'
  | 'analyzing'
  | 'complete';

export default function RegisterPage() {
  const [step, setStep] = useState<RegisterStep>('wait');
  const [stage, setStage] = useState<ProcessingStage>('chute_opened');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [itemData, setItemData] = useState<KioskItemData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (step === 'processing') {
      // SSE 연결 시작
      const cleanup = registerWithStream(
        // 진행 상황 업데이트
        (event) => {
          setStage(event.stage);
          setMessage(event.message);
          setProgress(event.progress || 0);
        },
        // 완료 시
        (data) => {
          setItemData(data);
          setStep('confirm');
        },
        // 에러 시
        (error) => {
          setErrorMessage(error);
          setStep('confirm');
        }
      );

      // cleanup: 컴포넌트 언마운트 시 연결 종료
      return cleanup;
    }
  }, [step]);

  // ... (생략)
}
```

### 3. ProcessingScreen 업데이트

```typescript
// src/components/kiosk/register/ProcessingScreen.tsx

interface ProcessingScreenProps {
  stage: ProcessingStage;
  message: string;
  progress?: number;
}

export default function ProcessingScreen({
  stage,
  message,
  progress
}: ProcessingScreenProps) {
  return (
    <KioskLayout>
      <Card>
        {/* 단계별 아이콘 */}
        {stage === 'capturing' && <Camera className="w-16 h-16" />}
        {stage === 'uploading' && <Upload className="w-16 h-16" />}
        {stage === 'analyzing' && <Brain className="w-16 h-16" />}

        <h1>{message}</h1>

        {/* 진행률 바 */}
        {progress !== undefined && (
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <LoadingSpinner />
      </Card>
    </KioskLayout>
  );
}
```

---

## 백엔드 API 스펙 (예상)

### Endpoint
```
GET /api/kiosk/register/stream
```

### Response (SSE Stream)

```
// 1단계: 투입구 개방
event: status
data: {"stage": "chute_opened", "message": "투입구가 열렸습니다"}

// 2단계: 촬영 시작
event: status
data: {"stage": "capturing", "message": "촬영 중입니다"}

// 3단계: 업로드 (진행률 포함)
event: status
data: {"stage": "uploading", "message": "사진 업로드 중", "progress": 25}

event: status
data: {"stage": "uploading", "message": "사진 업로드 중", "progress": 75}

// 4단계: AI 분석
event: status
data: {"stage": "analyzing", "message": "AI가 분석하고 있습니다"}

// 5단계: 완료
event: complete
data: {
  "item_id": 123,
  "photo_url": "https://...",
  "tags": ["휴대폰", "전자기기"],
  "found_date": "2025-12-02",
  "location": "하이테크관 2층"
}

// 에러 발생 시
event: error
data: {"stage": "capturing", "error": "카메라 연결 실패"}
```

---

## 구현 시 주의사항

### 1. **타임아웃 처리**
SSE도 네트워크 문제로 끊길 수 있음
```typescript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    if (step === 'processing') {
      setErrorMessage('요청 시간이 초과되었습니다');
      setStep('confirm');
    }
  }, 60000); // 60초 타임아웃

  return () => clearTimeout(timeoutId);
}, [step]);
```

### 2. **재시도 로직**
EventSource는 자동 재연결하지만, 커스텀 로직 필요할 수 있음
```typescript
eventSource.onerror = (e) => {
  if (eventSource.readyState === EventSource.CLOSED) {
    // 서버가 연결을 닫음 (정상 종료)
  } else {
    // 네트워크 에러 (재연결 시도 중)
    console.log('재연결 중...');
  }
};
```

### 3. **메모리 누수 방지**
반드시 cleanup 함수로 연결 종료
```typescript
useEffect(() => {
  // ...
  return () => {
    if (eventSource) {
      eventSource.close();
    }
  };
}, [step]);
```

### 4. **에러 경계 설정**
SSE 연결 실패 시 폴백 처리
```typescript
try {
  const eventSource = new EventSource(url);
  // ...
} catch (error) {
  // EventSource 지원 안하는 브라우저 (거의 없음)
  onError('브라우저가 SSE를 지원하지 않습니다');
}
```

---

## 마이그레이션 체크리스트

프론트엔드에서 해야 할 작업:

- [ ] `registerWithStream` 함수 구현 (`src/lib/api/kiosk.ts`)
- [ ] `RegistrationEvent` 타입 정의 (`src/lib/types/kiosk.ts`)
- [ ] `ProcessingScreen`에 stage, message, progress props 추가
- [ ] `register/page.tsx`에서 SSE 연결 로직으로 교체
- [ ] 타임아웃 처리 추가
- [ ] 에러 처리 강화
- [ ] 백엔드 API 스펙 확정 후 메시지 포맷 맞추기
- [ ] 실제 키오스크 환경에서 테스트

---

## 요약

### SSE를 사용하면?

**백엔드 입장:**
- ✅ 장시간 처리 안전하게 가능
- ✅ 각 단계별 독립적 에러 처리
- ✅ MQTT 비동기 처리 문제 해결
- ✅ 타임아웃 걱정 없음

**프론트엔드 입장:**
- ✅ 실시간 진행 상황 표시 가능
- ✅ 진행률 바 구현 가능
- ✅ 단계별 UI/UX 개선
- ✅ 사용자에게 명확한 피드백
- ⚠️ EventSource API 사용 필요 (간단함)
- ⚠️ 상태 관리 복잡도 약간 증가

**결론:** SSE는 등록 플로우처럼 **장시간 처리 + 실시간 피드백**이 필요한 경우 최적의 선택입니다.
