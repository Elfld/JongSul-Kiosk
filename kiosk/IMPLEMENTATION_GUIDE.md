# 키오스크 구현 가이드

> Claude Code를 위한 단계별 구현 매뉴얼

---

## 🎯 구현 전략

### 핵심 원칙
1. **컴포넌트 우선**: 공통 컴포넌트부터 구현
2. **플로우 단위**: 한 플로우씩 완성
3. **테스트 우선**: 각 단계마다 동작 확인
4. **점진적 개선**: 기본 → 상세 → 최적화

### 예상 작업 시간
- **Phase 1** (기초): 1-2시간
- **Phase 2** (컴포넌트): 2-3시간
- **Phase 3** (페이지): 3-4시간
- **Phase 4** (통합): 1-2시간
- **총 예상**: 7-11시간

---

## 📋 Phase 1: 프로젝트 설정 (30분)

### 1.1 디렉토리 구조 생성

```bash
mkdir -p src/app/kiosk/register/{insert,processing,confirm,complete}
mkdir -p src/app/kiosk/retrieve/{verifying,error,locker,complete}
mkdir -p src/components/kiosk
mkdir -p src/hooks
mkdir -p src/lib/types
```

### 1.2 타입 정의 추가

**파일**: `src/lib/types/kiosk.ts`
```typescript
export type RegisterStep =
  | 'wait'
  | 'insert'
  | 'processing'
  | 'confirm'
  | 'complete';

export type RetrieveStep =
  | 'input'
  | 'verifying'
  | 'error'
  | 'locker'
  | 'complete';

export interface KioskItemData {
  id: string;
  photoUrl: string;
  tags: string[];
  foundDate: string;
  location: string;
}

export interface PickupCodeData {
  code: string;
  lockerNumber: number;
}
```

### 1.3 유틸리티 함수 추가

**파일**: `src/lib/utils/kiosk.ts`
```typescript
// 테스트용 지연 함수
export const delay = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

// 테스트용 분석 결과 (Mock)
export const mockAnalysis = async (): Promise<KioskItemData> => {
  await delay(2000);
  return {
    id: 'test-1',
    photoUrl: '/images/sample-phone.jpg',
    tags: ['휴대폰', '전자기기'],
    foundDate: '9월 12일 발견',
    location: '하이테크관 2층 분실물센터',
  };
};

// 테스트용 코드 검증 (Mock)
export const mockVerifyCode = async (code: string): Promise<{
  success: boolean;
  lockerNumber?: number;
}> => {
  await delay(1500);
  // 테스트: "123456"만 성공
  if (code === '123456') {
    return { success: true, lockerNumber: 3 };
  }
  return { success: false };
};
```

### ✅ Phase 1 체크리스트
- [ ] 모든 디렉토리 생성 완료
- [ ] 타입 정의 파일 생성
- [ ] 유틸리티 함수 생성
- [ ] 기존 프로젝트와 충돌 없음 확인

---

## 🧩 Phase 2: 공통 컴포넌트 (2시간)

### 우선순위
1. KioskLayout (필수, 가장 기초)
2. KioskButton (필수, 모든 화면 사용)
3. StatusIcon (권장, 완료 화면용)
4. PinInput + NumPad (필수, 찾기 플로우)
5. ProgressTimer (권장, 자동 복귀용)

### 2.1 KioskLayout 구현

**파일**: `src/components/kiosk/KioskLayout.tsx`

```tsx
import { cn } from '@/lib/utils';

interface KioskLayoutProps {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export default function KioskLayout({
  children,
  centered = true,
  className,
}: KioskLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-gray-50',
        centered && 'flex items-center justify-center',
        className
      )}
    >
      <div className="w-full max-w-[768px] px-8 py-12">
        {children}
      </div>
    </div>
  );
}
```

**테스트**: 
```tsx
// src/app/kiosk/test/page.tsx
<KioskLayout>
  <h1>테스트</h1>
</KioskLayout>
```

### 2.2 KioskButton 구현

**파일**: `src/components/kiosk/KioskButton.tsx`

참고: `COMPONENTS_SPEC.md`의 전체 코드 참조

**테스트**:
```tsx
<KioskButton variant="primary" onClick={() => alert('클릭!')}>
  테스트 버튼
</KioskButton>
```

### 2.3 StatusIcon 구현

**파일**: `src/components/kiosk/StatusIcon.tsx`

참고: `COMPONENTS_SPEC.md`

### 2.4 PinInput 구현

**파일**: `src/components/kiosk/PinInput.tsx`

참고: `COMPONENTS_SPEC.md`

### 2.5 NumPad 구현

**파일**: `src/components/kiosk/NumPad.tsx`

참고: `COMPONENTS_SPEC.md`

**테스트**:
```tsx
const [pin, setPin] = useState('');

<div>
  <PinInput value={pin} />
  <NumPad
    onNumberPress={(n) => setPin(pin + n)}
    onDelete={() => setPin(pin.slice(0, -1))}
    onConfirm={() => alert(pin)}
  />
</div>
```

### 2.6 ProgressTimer 구현

**파일**: `src/components/kiosk/ProgressTimer.tsx`

참고: `COMPONENTS_SPEC.md`

### 2.7 컴포넌트 인덱스

**파일**: `src/components/kiosk/index.ts`
```typescript
export { default as KioskLayout } from './KioskLayout';
export { default as KioskButton } from './KioskButton';
export { default as StatusIcon } from './StatusIcon';
export { default as PinInput } from './PinInput';
export { default as NumPad } from './NumPad';
export { default as ProgressTimer } from './ProgressTimer';
```

### ✅ Phase 2 체크리스트
- [ ] KioskLayout 동작 확인
- [ ] KioskButton 4가지 variant 테스트
- [ ] StatusIcon 5가지 type 테스트
- [ ] PinInput + NumPad 통합 테스트
- [ ] ProgressTimer 카운트다운 확인
- [ ] 인덱스 파일로 import 가능

---

## 📱 Phase 3: 페이지 구현 (4시간)

### 3.1 초기 화면 (30분)

**파일**: `src/app/kiosk/page.tsx`

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { KioskLayout, KioskButton } from '@/components/kiosk';

export default function KioskMainPage() {
  const router = useRouter();

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-12">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-7xl font-bold text-gray-800 leading-tight">
            인하대 분실물
            <br />
            키오스크
          </h1>
        </div>

        {/* 부제 */}
        <p className="text-4xl text-gray-500 font-medium">
          24시간 분실물 센터
        </p>

        {/* 버튼 영역 */}
        <div className="w-full max-w-[400px] flex flex-col gap-8 mt-8">
          <KioskButton
            variant="primary"
            size="large"
            fullWidth
            onClick={() => router.push('/kiosk/register')}
          >
            분실물 등록
          </KioskButton>

          <KioskButton
            variant="secondary"
            size="large"
            fullWidth
            onClick={() => router.push('/kiosk/retrieve')}
          >
            분실물 찾기
          </KioskButton>
        </div>
      </div>
    </KioskLayout>
  );
}
```

**테스트**: `/kiosk` 접속 → 버튼 클릭 → 라우팅 확인

### 3.2 등록 플로우 (2시간)

#### 3.2.1 등록 대기 화면

**파일**: `src/app/kiosk/register/page.tsx`

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { Package } from 'lucide-react';
import { KioskLayout, KioskButton } from '@/components/kiosk';

export default function RegisterWaitPage() {
  const router = useRouter();

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-12">
        {/* 타이틀 */}
        <h1 className="text-6xl font-bold text-gray-800 text-center">
          분실물 등록
        </h1>

        {/* 설명 */}
        <p className="text-3xl text-gray-600 text-center">
          분실물을 투입구에 넣어주세요
        </p>

        {/* 박스 아이콘 영역 */}
        <div className="w-[400px] h-[250px] border-4 border-dashed border-gray-300 rounded-3xl bg-white flex items-center justify-center">
          <Package className="w-24 h-24 text-gray-300" />
        </div>

        {/* 시작하기 버튼 */}
        <KioskButton
          variant="primary"
          onClick={() => router.push('/kiosk/register/insert')}
        >
          시작하기
        </KioskButton>

        {/* 처음 화면으로 버튼 */}
        <KioskButton
          variant="secondary"
          onClick={() => router.push('/kiosk')}
        >
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
```

#### 3.2.2 투입 화면

**파일**: `src/app/kiosk/register/insert/page.tsx`

참고: `KIOSK_FIGMA_SPEC.md` "등록 플로우 2: 투입 화면"

주요 변경점:
- 박스 아이콘: `PackageOpen` 또는 `Inbox` 사용
- 테두리: `border-sky-500` (활성화 상태)

#### 3.2.3 분석 중 화면

**파일**: `src/app/kiosk/register/processing/page.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';
import { mockAnalysis } from '@/lib/utils/kiosk';

export default function RegisterProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    async function analyze() {
      await mockAnalysis(); // 2초 대기
      router.push('/kiosk/register/confirm');
    }

    analyze();
  }, [router]);

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-6xl font-bold text-gray-800">
          분석 중
        </h1>
        <p className="text-3xl text-gray-600">
          분실물을 인식하고 있어요...
        </p>
        <LoadingSpinner />
      </div>
    </KioskLayout>
  );
}
```

#### 3.2.4 정보 확인 화면

**파일**: `src/app/kiosk/register/confirm/page.tsx`

참고: `KIOSK_FIGMA_SPEC.md` "등록 플로우 4: 정보 확인"

주요 구현:
- 카드 레이아웃 (`bg-white rounded-3xl p-8 shadow-lg`)
- 태그 스타일 (`bg-sky-100 text-sky-700 rounded-full`)
- 2개 버튼 (확인 / 다시하기)

#### 3.2.5 등록 완료 화면

**파일**: `src/app/kiosk/register/complete/page.tsx`

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { StatusIcon, KioskLayout, KioskButton, ProgressTimer } from '@/components/kiosk';

export default function RegisterCompletePage() {
  const router = useRouter();

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-10">
        {/* 체크 아이콘 */}
        <StatusIcon type="success" />

        {/* 타이틀 */}
        <h1 className="text-6xl font-bold text-gray-800">
          등록 완료
        </h1>

        {/* 설명 */}
        <p className="text-2xl text-gray-600 text-center leading-relaxed">
          분실물이 성공적으로 등록되었어요
          <br />
          안심하고 돌아가세요
        </p>

        {/* 새로운 등록 버튼 */}
        <KioskButton
          variant="primary"
          size="large"
          onClick={() => router.push('/kiosk/register')}
        >
          새로운 등록
        </KioskButton>

        {/* 프로그레스 타이머 */}
        <ProgressTimer
          duration={5}
          onComplete={() => router.push('/kiosk')}
        />
      </div>
    </KioskLayout>
  );
}
```

### 3.3 찾기 플로우 (2시간)

#### 3.3.1 코드 입력 화면

**파일**: `src/app/kiosk/retrieve/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KioskLayout, KioskButton, PinInput, NumPad } from '@/components/kiosk';

export default function RetrieveInputPage() {
  const router = useRouter();
  const [pinCode, setPinCode] = useState('');

  const handleNumberPress = (num: number) => {
    if (pinCode.length < 6) {
      setPinCode(pinCode + num);
    }
  };

  const handleDelete = () => {
    setPinCode(pinCode.slice(0, -1));
  };

  const handleConfirm = () => {
    if (pinCode.length === 6) {
      // 코드를 URL 파라미터로 전달
      router.push(`/kiosk/retrieve/verifying?code=${pinCode}`);
    }
  };

  return (
    <KioskLayout centered={false}>
      <div className="flex flex-col gap-8">
        {/* 타이틀 */}
        <h1 className="text-6xl font-bold text-gray-800">
          분실물 수령
        </h1>

        {/* 설명 */}
        <p className="text-2xl text-gray-600 text-center leading-relaxed">
          홈페이지에서 발급받은
          <br />
          비밀번호 6자리를 입력해주세요
        </p>

        {/* PIN 입력 */}
        <PinInput value={pinCode} />

        {/* 숫자 키패드 */}
        <NumPad
          onNumberPress={handleNumberPress}
          onDelete={handleDelete}
          onConfirm={handleConfirm}
        />

        {/* 처음 화면으로 */}
        <KioskButton
          variant="secondary"
          fullWidth
          onClick={() => router.push('/kiosk')}
        >
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
```

#### 3.3.2 확인 중 화면

**파일**: `src/app/kiosk/retrieve/verifying/page.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';
import { mockVerifyCode } from '@/lib/utils/kiosk';

export default function RetrieveVerifyingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';

  useEffect(() => {
    async function verify() {
      const result = await mockVerifyCode(code);

      if (result.success) {
        router.push(`/kiosk/retrieve/locker?number=${result.lockerNumber}`);
      } else {
        router.push('/kiosk/retrieve/error');
      }
    }

    verify();
  }, [code, router]);

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-6xl font-bold text-gray-800">
          코드 확인 중
        </h1>
        <p className="text-3xl text-gray-600">
          잠시만 기다려주세요...
        </p>
        <LoadingSpinner />
      </div>
    </KioskLayout>
  );
}
```

#### 3.3.3 오류 화면

**파일**: `src/app/kiosk/retrieve/error/page.tsx`

참고: `KIOSK_FIGMA_SPEC.md` "찾기 플로우 3: 코드 오류"

주요 구현:
- StatusIcon type="warning"
- 오렌지색 버튼 (`variant="warning"`)

#### 3.3.4 사물함 개방 화면

**파일**: `src/app/kiosk/retrieve/locker/page.tsx`

참고: `KIOSK_FIGMA_SPEC.md` "찾기 플로우 4: 사물함 개방"

주요 구현:
- StatusIcon type="unlock"
- 녹색 버튼 (`variant="success"`)
- URL 파라미터에서 사물함 번호 읽기

#### 3.3.5 완료 화면

**파일**: `src/app/kiosk/retrieve/complete/page.tsx`

참고: `KIOSK_FIGMA_SPEC.md` "찾기 플로우 5: 완료"

### ✅ Phase 3 체크리스트
- [ ] 초기 화면 동작 확인
- [ ] 등록 플로우 5단계 전체 테스트
- [ ] 찾기 플로우 5단계 전체 테스트
- [ ] 자동 전환 (processing, verifying) 확인
- [ ] 자동 복귀 (complete) 5초 확인
- [ ] "처음 화면으로" 버튼 동작 확인

---

## 🔗 Phase 4: 통합 & 최적화 (1시간)

### 4.1 메타데이터 설정

**파일**: `src/app/kiosk/layout.tsx`

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '인하대 분실물 키오스크',
  description: '24시간 분실물 등록 및 수령 서비스',
};

export default function KioskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

### 4.2 브라우저 뒤로가기 방지

**파일**: `src/hooks/usePreventBack.ts`

```typescript
'use client';

import { useEffect } from 'react';

export function usePreventBack() {
  useEffect(() => {
    // 현재 위치를 히스토리에 추가
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      // 뒤로가기 시도 시 다시 현재 위치로
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}
```

**적용**: 모든 키오스크 페이지에
```tsx
usePreventBack();
```

### 4.3 에러 바운더리

**파일**: `src/app/kiosk/error.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import { KioskLayout, KioskButton } from '@/components/kiosk';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <KioskLayout>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-5xl font-bold text-gray-800">
          오류가 발생했습니다
        </h1>
        <p className="text-2xl text-gray-600 text-center">
          잠시 후 다시 시도해주세요
        </p>
        <KioskButton variant="primary" onClick={reset}>
          다시 시도
        </KioskButton>
        <KioskButton
          variant="secondary"
          onClick={() => (window.location.href = '/kiosk')}
        >
          처음 화면으로
        </KioskButton>
      </div>
    </KioskLayout>
  );
}
```

### 4.4 로딩 상태

**파일**: `src/app/kiosk/loading.tsx`

```tsx
import { KioskLayout } from '@/components/kiosk';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <KioskLayout>
      <LoadingSpinner />
    </KioskLayout>
  );
}
```

### ✅ Phase 4 체크리스트
- [ ] 메타데이터 설정 확인
- [ ] 뒤로가기 방지 동작 확인
- [ ] 에러 바운더리 테스트
- [ ] 로딩 상태 표시 확인

---

## 🧪 테스트 시나리오

### 필수 테스트

1. **등록 플로우 완주**
   ```
   /kiosk
   → /kiosk/register
   → /kiosk/register/insert
   → /kiosk/register/processing (2초 자동)
   → /kiosk/register/confirm
   → /kiosk/register/complete
   → /kiosk (5초 자동)
   ```

2. **찾기 플로우 성공**
   ```
   코드 "123456" 입력
   → /kiosk/retrieve/locker?number=3
   → /kiosk/retrieve/complete
   → /kiosk (5초 자동)
   ```

3. **찾기 플로우 실패**
   ```
   잘못된 코드 입력
   → /kiosk/retrieve/error
   → [다시 시도]
   → /kiosk/retrieve
   ```

4. **중간 이탈**
   ```
   모든 화면에서 "처음 화면으로" 클릭
   → /kiosk로 즉시 이동
   ```

### 예외 상황 테스트

- [ ] PIN 입력 중 6자리 초과 방지
- [ ] 빈 PIN으로 확인 버튼 무반응
- [ ] 타이머 진행 중 페이지 이탈 시 타이머 정리
- [ ] 네트워크 오류 시 에러 화면 표시

---

## 📊 완성도 체크리스트

### UI/UX
- [ ] 모든 텍스트 Figma와 일치
- [ ] 색상 정확히 적용
- [ ] 간격 일관성 유지
- [ ] 버튼 크기 터치 친화적 (최소 64px)
- [ ] 텍스트 크기 가독성 좋음 (최소 20px)

### 기능
- [ ] 11개 페이지 모두 구현
- [ ] 페이지 간 전환 정상 동작
- [ ] 자동 전환 (processing, verifying) 작동
- [ ] 자동 복귀 (complete) 5초 작동
- [ ] 에러 처리 구현

### 코드 품질
- [ ] TypeScript 타입 에러 없음
- [ ] 'use client' 디렉티브 적절히 사용
- [ ] 컴포넌트 재사용성 고려
- [ ] 불필요한 의존성 없음
- [ ] console.error 제거

### 성능
- [ ] 페이지 전환 부드러움
- [ ] 이미지 최적화 (next/image 사용)
- [ ] 불필요한 리렌더링 없음

---

## 🚀 배포 전 체크리스트

- [ ] 모든 페이지 접속 가능
- [ ] 모바일/태블릿에서 테스트
- [ ] 브라우저 호환성 확인
- [ ] 에러 로그 확인
- [ ] 성능 측정 (Lighthouse)
- [ ] 접근성 검사 (a11y)

---

## 📚 추가 개선 사항 (Optional)

### 우선순위 낮음
1. **애니메이션 추가**
   - 페이지 전환 fade 효과
   - 버튼 클릭 피드백

2. **사운드 효과**
   - 버튼 클릭 소리
   - 완료 알림음

3. **실제 API 연동**
   - Mock 함수를 실제 API로 교체
   - 에러 처리 강화

4. **관리자 기능**
   - 통계 대시보드
   - 설정 페이지

---

## 🆘 문제 해결 가이드

### 자주 발생하는 문제

1. **"use client" 관련 에러**
   ```
   해결: 파일 최상단에 'use client' 추가
   ```

2. **라우터 동작 안 함**
   ```
   해결: next/navigation에서 import 확인
   ```

3. **스타일 적용 안 됨**
   ```
   해결: tailwind.config에 경로 추가
   ```

4. **타입 에러**
   ```
   해결: types/kiosk.ts 파일 import 확인
   ```

---

## 📞 도움이 필요할 때

참고 문서:
- `KIOSK_FIGMA_SPEC.md` - 디자인 상세
- `COMPONENTS_SPEC.md` - 컴포넌트 명세
- `FLOW_DIAGRAM.md` - 플로우 구조
- `KIOSK_DEVELOPMENT_GUIDE.md` - 프로젝트 설정

---

**이 가이드를 순서대로 따라하면 Figma 디자인과 동일한 키오스크를 완성할 수 있습니다!**
