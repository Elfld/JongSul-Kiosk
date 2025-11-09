# 키오스크 컴포넌트 명세서

> 재사용 가능한 공통 컴포넌트 상세 명세

---

## 📦 컴포넌트 구조

```
src/components/kiosk/
├── KioskButton.tsx          # Primary/Secondary 버튼
├── PinInput.tsx             # 6자리 PIN 입력
├── NumPad.tsx               # 숫자 키패드
├── ProgressTimer.tsx        # 자동 복귀 타이머
├── StatusIcon.tsx           # 상태별 아이콘 (원형 배경)
└── KioskLayout.tsx          # 공통 레이아웃
```

---

## 1️⃣ KioskButton

### Props
```typescript
interface KioskButtonProps {
  variant: 'primary' | 'secondary' | 'warning' | 'success';
  size?: 'large' | 'medium' | 'small';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}
```

### 스타일 정의
```tsx
const variants = {
  primary: 'bg-sky-500 text-white hover:bg-sky-600',
  secondary: 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
  warning: 'bg-orange-500 text-white hover:bg-orange-600',
  success: 'bg-green-500 text-white hover:bg-green-600',
};

const sizes = {
  large: 'py-6 text-2xl',    // 96px 높이
  medium: 'py-5 text-2xl',   // 80px 높이
  small: 'py-4 text-xl',     // 64px 높이
};
```

### 구현
```tsx
'use client';

import { cn } from '@/lib/utils';

interface KioskButtonProps {
  variant?: 'primary' | 'secondary' | 'warning' | 'success';
  size?: 'large' | 'medium' | 'small';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function KioskButton({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  className,
}: KioskButtonProps) {
  const variants = {
    primary: 'bg-sky-500 text-white hover:bg-sky-600',
    secondary: 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
    warning: 'bg-orange-500 text-white hover:bg-orange-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
  };

  const sizes = {
    large: 'py-6 text-2xl',
    medium: 'py-5 text-2xl',
    small: 'py-4 text-xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-full font-bold transition-colors',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : 'w-auto px-12',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}
```

### 사용 예시
```tsx
// Primary 버튼
<KioskButton variant="primary" onClick={handleStart}>
  시작하기
</KioskButton>

// Secondary 버튼 (전체 너비)
<KioskButton variant="secondary" fullWidth>
  처음 화면으로
</KioskButton>

// 경고 버튼
<KioskButton variant="warning" size="large">
  다시 시도
</KioskButton>
```

---

## 2️⃣ PinInput

### Props
```typescript
interface PinInputProps {
  length?: number;           // 기본 6
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}
```

### 구현
```tsx
'use client';

import { cn } from '@/lib/utils';

interface PinInputProps {
  length?: number;
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function PinInput({
  length = 6,
  value,
  onChange,
  className,
}: PinInputProps) {
  return (
    <div className={cn('flex justify-center gap-3', className)}>
      {Array.from({ length }).map((_, index) => {
        const hasValue = index < value.length;
        const digit = value[index] || '';

        return (
          <div
            key={index}
            className={cn(
              'w-16 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold transition-all',
              hasValue
                ? 'bg-sky-100 border-2 border-sky-500 text-sky-700'
                : 'bg-white border-2 border-gray-300 text-gray-300'
            )}
          >
            {hasValue ? digit : '·'}
          </div>
        );
      })}
    </div>
  );
}
```

### 사용 예시
```tsx
const [pinCode, setPinCode] = useState('');

<PinInput 
  value={pinCode} 
  onChange={setPinCode}
/>
```

---

## 3️⃣ NumPad

### Props
```typescript
interface NumPadProps {
  onNumberPress: (num: number) => void;
  onDelete: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
}
```

### 구현
```tsx
'use client';

import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumPadProps {
  onNumberPress: (num: number) => void;
  onDelete: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
}

export default function NumPad({
  onNumberPress,
  onDelete,
  onConfirm,
  disabled = false,
  className,
}: NumPadProps) {
  const buttons = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9,
  ];

  return (
    <div className={cn('grid grid-cols-3 gap-1 max-w-[600px]', className)}>
      {/* 숫자 버튼 1-9 */}
      {buttons.map((num) => (
        <button
          key={num}
          onClick={() => onNumberPress(num)}
          disabled={disabled}
          className="h-20 bg-white hover:bg-gray-50 text-3xl font-semibold text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {num}
        </button>
      ))}

      {/* 지우기 버튼 */}
      <button
        onClick={onDelete}
        disabled={disabled}
        className="h-20 bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-50"
      >
        <Delete className="w-7 h-7 text-red-500" />
      </button>

      {/* 0 버튼 */}
      <button
        onClick={() => onNumberPress(0)}
        disabled={disabled}
        className="h-20 bg-white hover:bg-gray-50 text-3xl font-semibold text-gray-800 transition-colors disabled:opacity-50"
      >
        0
      </button>

      {/* 확인 버튼 */}
      <button
        onClick={onConfirm}
        disabled={disabled}
        className="h-20 bg-sky-50 hover:bg-sky-100 text-xl font-bold text-sky-600 transition-colors disabled:opacity-50"
      >
        확인
      </button>
    </div>
  );
}
```

### 사용 예시
```tsx
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
    // 코드 검증 로직
  }
};

<NumPad
  onNumberPress={handleNumberPress}
  onDelete={handleDelete}
  onConfirm={handleConfirm}
  disabled={isLoading}
/>
```

---

## 4️⃣ ProgressTimer

### Props
```typescript
interface ProgressTimerProps {
  duration?: number;         // 초 단위, 기본 5
  onComplete: () => void;
  message?: string;
  className?: string;
}
```

### 구현
```tsx
'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressTimerProps {
  duration?: number;
  onComplete: () => void;
  message?: string;
  className?: string;
}

export default function ProgressTimer({
  duration = 5,
  onComplete,
  message = '초 후 처음 화면으로 돌아갑니다',
  className,
}: ProgressTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className={cn('w-full max-w-[400px]', className)}>
      <p className="text-sm text-gray-500 text-center mb-2">
        {timeLeft}{message}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-sky-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
```

### 사용 예시
```tsx
const router = useRouter();

<ProgressTimer
  duration={5}
  onComplete={() => router.push('/kiosk')}
  message="초 후 메인으로 돌아갑니다"
/>
```

---

## 5️⃣ StatusIcon

### Props
```typescript
interface StatusIconProps {
  type: 'success' | 'error' | 'warning' | 'unlock' | 'party';
  className?: string;
}
```

### 구현
```tsx
'use client';

import { Check, AlertCircle, LockOpen, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusIconProps {
  type: 'success' | 'error' | 'warning' | 'unlock' | 'party';
  className?: string;
}

export default function StatusIcon({ type, className }: StatusIconProps) {
  const configs = {
    success: {
      bg: 'bg-sky-500',
      Icon: Check,
    },
    error: {
      bg: 'bg-red-500',
      Icon: AlertCircle,
    },
    warning: {
      bg: 'bg-orange-500',
      Icon: AlertCircle,
    },
    unlock: {
      bg: 'bg-green-500',
      Icon: LockOpen,
    },
    party: {
      bg: 'bg-sky-500',
      Icon: PartyPopper,
    },
  };

  const config = configs[type];
  const Icon = config.Icon;

  return (
    <div
      className={cn(
        'w-40 h-40 rounded-full flex items-center justify-center',
        config.bg,
        className
      )}
    >
      <Icon className="w-24 h-24 text-white stroke-[3]" />
    </div>
  );
}
```

### 사용 예시
```tsx
// 등록 완료
<StatusIcon type="success" />

// 코드 오류
<StatusIcon type="warning" />

// 사물함 개방
<StatusIcon type="unlock" />

// 이용 완료
<StatusIcon type="party" />
```

---

## 6️⃣ KioskLayout

### Props
```typescript
interface KioskLayoutProps {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
}
```

### 구현
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

### 사용 예시
```tsx
// 중앙 정렬 레이아웃
<KioskLayout>
  <div className="flex flex-col items-center gap-8">
    {/* 컨텐츠 */}
  </div>
</KioskLayout>

// 상단 정렬 레이아웃
<KioskLayout centered={false}>
  <div className="flex flex-col gap-8">
    {/* 컨텐츠 */}
  </div>
</KioskLayout>
```

---

## 📦 인덱스 파일

```typescript
// src/components/kiosk/index.ts
export { default as KioskButton } from './KioskButton';
export { default as PinInput } from './PinInput';
export { default as NumPad } from './NumPad';
export { default as ProgressTimer } from './ProgressTimer';
export { default as StatusIcon } from './StatusIcon';
export { default as KioskLayout } from './KioskLayout';
```

### 사용 시
```tsx
import {
  KioskButton,
  PinInput,
  NumPad,
  KioskLayout,
} from '@/components/kiosk';
```

---

## 🎨 공통 스타일 상수

```typescript
// src/components/kiosk/styles.ts
export const KIOSK_STYLES = {
  // 색상
  colors: {
    primary: 'sky-500',
    secondary: 'gray-300',
    success: 'green-500',
    warning: 'orange-500',
    error: 'red-500',
  },

  // 크기
  sizes: {
    icon: {
      small: 'w-16 h-16',
      medium: 'w-20 h-20',
      large: 'w-24 h-24',
    },
    button: {
      small: 'h-16',
      medium: 'h-20',
      large: 'h-24',
    },
  },

  // 간격
  spacing: {
    section: 'gap-12',
    element: 'gap-8',
    small: 'gap-4',
  },

  // 타이포그래피
  typography: {
    hero: 'text-7xl font-bold',
    title: 'text-6xl font-bold',
    subtitle: 'text-5xl font-bold',
    heading: 'text-4xl font-bold',
    body: 'text-2xl',
    caption: 'text-xl',
  },
} as const;
```

---

## 🔧 유틸리티 Hook

### useKioskTimer
```typescript
// src/hooks/useKioskTimer.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useKioskTimer(duration: number = 5, redirectTo: string = '/kiosk') {
  const [timeLeft, setTimeLeft] = useState(duration);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push(redirectTo);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, router, redirectTo]);

  const progress = ((duration - timeLeft) / duration) * 100;

  return { timeLeft, progress };
}
```

### 사용 예시
```tsx
const { timeLeft, progress } = useKioskTimer(5, '/kiosk');

<div>
  <p>{timeLeft}초 후 돌아갑니다</p>
  <div className="w-full bg-gray-200 h-2 rounded-full">
    <div 
      className="bg-sky-500 h-2 rounded-full transition-all"
      style={{ width: `${progress}%` }}
    />
  </div>
</div>
```

---

## 📝 타입 정의

```typescript
// src/lib/types/kiosk.ts
export type KioskStep =
  | 'main'
  | 'register-wait'
  | 'register-insert'
  | 'register-processing'
  | 'register-confirm'
  | 'register-complete'
  | 'retrieve-input'
  | 'retrieve-verifying'
  | 'retrieve-error'
  | 'retrieve-locker'
  | 'retrieve-complete';

export interface KioskItemData {
  id: string;
  photoUrl: string;
  tags: string[];
  foundDate: string;
  location: string;
}

export interface PickupCode {
  code: string;
  lockerNumber: number;
}
```

---

## ✅ 컴포넌트 체크리스트

구현 시 확인사항:

- [ ] `'use client'` 디렉티브 추가
- [ ] TypeScript props 타입 정의
- [ ] 접근성 고려 (aria-label, role 등)
- [ ] 키보드 네비게이션 지원
- [ ] 로딩/비활성 상태 처리
- [ ] 반응형 스타일 적용
- [ ] 터치 최적화 (최소 64px)
- [ ] 트랜지션 효과 추가

---

**모든 컴포넌트는 키오스크 터치 UI에 최적화되어 있습니다.**
