# Pointer Events 기반 버튼 피드백 구현 설명

모바일 환경에서 버튼 터치 시 눌림/떼짐 피드백이 확실히 보이도록 구현한 방식을 설명합니다.

## 목차

1. [문제 상황](#1-문제-상황)
2. [해결 방법](#2-해결-방법)
3. [이벤트 흐름 상세 분석](#3-이벤트-흐름-상세-분석)
4. [CSS와의 연동](#4-css와의-연동)
5. [80ms 지연의 근거](#5-80ms-지연의-근거)
6. [엣지 케이스 처리](#6-엣지-케이스-처리)
7. [NumPad와 KioskButton의 차이](#7-numpad와-kioskbutton의-차이)

---

## 1. 문제 상황

### 기존 CSS 기반 방식의 한계

```tsx
// 기존 코드
<button
  onClick={handleClick}
  className="... hover:bg-[#45a049] active:bg-[#3d8b40] active:scale-[0.96]"
>
```

**문제점:**

- `active:` 가상 클래스는 **브라우저가 제어**함
- 터치 이벤트 → `click` 이벤트 발생 → 페이지 전환이 **거의 동시에** 일어남
- 브라우저가 `active` 상태를 적용하기도 전에 화면이 넘어가버림

```
[터치] → [active 상태 적용?] → [click 발생] → [페이지 전환]
         ↑
    이 단계가 너무 짧거나 생략됨
```

---

## 2. 해결 방법

### Pointer Events란?

마우스, 터치, 펜 등 **모든 포인팅 장치를 통합**하는 이벤트 API입니다.

| 이벤트           | 발생 시점                      |
| ---------------- | ------------------------------ |
| `pointerdown`    | 손가락/마우스가 누르는 순간    |
| `pointerup`      | 손가락/마우스를 떼는 순간      |
| `pointerleave`   | 누른 상태로 요소 밖으로 이동   |
| `pointercancel`  | 터치가 시스템에 의해 취소됨    |

### 핵심: 개발자가 직접 타이밍을 제어

```tsx
const [pressed, setPressed] = useState(false);
```

**React State로 눌림 상태를 직접 관리**하면:

- 언제 눌림 효과를 적용할지 **개발자가 결정**
- 언제 동작(onClick)을 실행할지 **개발자가 결정**
- CSS 브라우저 동작에 의존하지 않음

---

## 3. 이벤트 흐름 상세 분석

### 핸들러 코드

```tsx
const handlePointerDown = () => {
  if (disabled) return;
  setPressed(true);  // ① 즉시 눌림 상태
};

const handlePointerUp = () => {
  if (disabled) return;
  setPressed(false);  // ② 즉시 떼짐 상태
  setTimeout(() => {
    onClick?.();      // ③ 80ms 후 동작 실행
  }, 80);
};

const handlePointerLeave = () => {
  setPressed(false);  // ④ 영역 이탈 시 취소
};
```

### 시간 흐름도

```
시간 →  0ms        10ms       80ms       90ms      180ms
        │          │          │          │          │
        ▼          ▼          ▼          ▼          ▼
      터치        CSS       터치끝     onClick    페이지
      시작      transition   (떼짐)     실행      전환
        │        적용중        │          │          │
        │          │          │          │          │
pressed ████████████████████████          │          │
= true  │          │          │          │          │
        │          │          │          │          │
pressed │          │          ░░░░░░░░░░░░          │
= false │          │          │ 80ms 대기 │          │
        │          │          │          │          │
        └──────────┴──────────┴──────────┴──────────┘

        [시각 피드백 보장 구간]   [지연]   [동작]
```

---

## 4. CSS와의 연동

### 버튼 컴포넌트 스타일

```tsx
<button
  className={cn(
    'rounded-full font-bold transition-all duration-100',
    //                         ↑ 100ms 동안 부드럽게 전환

    pressed ? pressedColors[variant] : baseColors[variant],
    //        ↑ 어두운 색상              ↑ 기본 색상

    pressed ? 'scale-[0.96]' : 'scale-100',
    //        ↑ 4% 축소                  ↑ 원래 크기
  )}
>
```

### 색상 전환 예시 (primary 버튼)

| 상태                     | 배경색                   | 크기 |
| ------------------------ | ------------------------ | ---- |
| 기본 (`pressed=false`)   | `#4caf50` (밝은 초록)    | 100% |
| 눌림 (`pressed=true`)    | `#3d8b40` (어두운 초록)  | 96%  |

```
transition-all duration-100 적용으로:
색상과 크기가 100ms에 걸쳐 부드럽게 전환됨
```

### 색상 정의

```tsx
// 기본 상태 색상
const baseColors = {
  primary: 'bg-[#4caf50] text-white',
  secondary: 'bg-white border-2 border-gray-300 text-[#6c757d]',
  below: 'bg-[#59969d] text-white',
  warning: 'bg-[#ff9800] text-white',
  success: 'bg-[#4caf50] text-white',
  dark: 'bg-[#475569] text-white',
};

// 눌림 상태 색상
const pressedColors = {
  primary: 'bg-[#3d8b40] text-white',
  secondary: 'bg-gray-100 border-2 border-gray-300 text-[#6c757d]',
  below: 'bg-[#3d6a6f] text-white',
  warning: 'bg-[#e65100] text-white',
  success: 'bg-[#3d8b40] text-white',
  dark: 'bg-[#1e293b] text-white',
};
```

---

## 5. 80ms 지연의 근거

```tsx
setTimeout(() => {
  onClick?.();
}, 80);
```

### 계산 근거

- CSS `transition-all duration-100` = 100ms 전환 시간
- 떼짐 효과가 **시작**되는 것만 보여도 충분
- 80ms면 전환의 80%가 완료됨 → 사용자가 피드백을 인지 가능
- 너무 길면 버튼이 느리게 느껴짐

```
0ms   20ms   40ms   60ms   80ms   100ms
│     │      │      │      │      │
████████████████████████████░░░░░░░
└─────── 80% 전환 완료 ─────┘
              ↑
         onClick 실행 시점
```

---

## 6. 엣지 케이스 처리

### pointerLeave (터치가 버튼 밖으로 이동)

```tsx
const handlePointerLeave = () => {
  setPressed(false);
};
```

```
  ┌─────────────┐
  │   버튼      │  ← 여기서 터치 시작
  │             │
  └─────────────┘
         │
         ▼ 손가락이 밖으로 이동

→ pressed = false로 설정
→ onClick 실행 안 함 (의도하지 않은 터치)
```

### pointerCancel (시스템이 터치 취소)

```tsx
onPointerCancel={handlePointerLeave}
```

다음 상황에서 발생:

- 전화가 오거나
- 시스템 제스처가 인식되거나
- 브라우저가 터치를 가로채는 경우

→ 안전하게 눌림 상태 해제

---

## 7. NumPad와 KioskButton의 차이

|                | KioskButton | NumPad  |
| -------------- | ----------- | ------- |
| 지연 시간      | **80ms**    | **0ms** |
| 이유           | 페이지 전환이 있어서 피드백 필요 | 숫자 입력은 즉각 반응 기대 |

### NumPad 코드 - 지연 없음

```tsx
const handlePointerUp = (callback: () => void) => {
  setPressedKey(null);
  callback();  // 즉시 실행
};
```

NumPad는 숫자를 빠르게 연속 입력해야 하므로 지연이 있으면 답답하게 느껴집니다.

---

## 요약

| 항목 | 내용 |
| ---- | ---- |
| CSS `active:` 의존 제거 | React State로 직접 제어 |
| Pointer Events 사용 | 마우스/터치 통합 처리 |
| 80ms 지연 | 시각 피드백이 보인 후 동작 실행 |
| 엣지 케이스 처리 | pointerLeave/Cancel로 안전한 취소 |

---

## 관련 파일

- `src/components/kiosk/KioskButton.tsx` - 메인 버튼 컴포넌트
- `src/components/kiosk/NumPad.tsx` - 숫자 입력 패드 컴포넌트
