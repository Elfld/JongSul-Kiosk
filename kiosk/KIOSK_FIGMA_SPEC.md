# 키오스크 Figma 디자인 완벽 복제 명세서

> Claude Code가 Figma 디자인을 픽셀 퍼펙트로 구현하기 위한 상세 명세

---

## 기본 레이아웃 정보

### 화면 크기
- **기준**: 768px × 1024px (태블릿 세로)
- **반응형**: `max-w-[768px] mx-auto min-h-screen`
- **배경**: `bg-gray-50`

### 공통 패딩
- **외부 컨테이너**: `px-8 py-12`
- **내부 요소 간격**: `gap-8` (32px)

---

## 🏠 초기 화면 (`/kiosk`)

### 레이아웃
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
  <div className="w-full max-w-[700px] flex flex-col items-center gap-12">
    {/* 타이틀 */}
    {/* 부제 */}
    {/* 버튼 영역 */}
  </div>
</div>
```

### 1. 타이틀
```tsx
<div className="text-center">
  <h1 className="text-7xl font-bold text-gray-800 leading-tight">
    인하대 분실물
    <br />
    키오스크
  </h1>
</div>
```
- **텍스트**: "인하대 분실물\n키오스크" (2줄)
- **크기**: `text-7xl` (72px)
- **굵기**: `font-bold`
- **색상**: `text-gray-800` (#2c3e50 근사)
- **줄간격**: `leading-tight`

### 2. 부제
```tsx
<p className="text-4xl text-gray-500 font-medium">
  24시간 분실물 센터
</p>
```
- **텍스트**: "24시간 분실물 센터"
- **크기**: `text-4xl` (36px)
- **색상**: `text-gray-500` (#6c757d 근사)

### 3. 버튼 영역
```tsx
<div className="w-full max-w-[400px] flex flex-col gap-8 mt-8">
  {/* Primary 버튼 */}
  <button className="w-full bg-sky-500 text-white py-6 rounded-full text-2xl font-bold hover:bg-sky-600 transition-colors">
    분실물 등록
  </button>
  
  {/* Secondary 버튼 */}
  <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-6 rounded-full text-2xl font-semibold hover:bg-gray-50 transition-colors">
    분실물 찾기
  </button>
</div>
```

#### Primary 버튼 (등록)
- **배경**: `bg-sky-500` (Figma #4caf50 → 프로젝트 표준)
- **텍스트**: "분실물 등록"
- **높이**: `py-6` (96px 총 높이)
- **모양**: `rounded-full`

#### Secondary 버튼 (찾기)
- **배경**: `bg-white border-2 border-gray-300`
- **텍스트**: "분실물 찾기"
- **높이**: `py-6`

---

## 📦 등록 플로우 1: 대기 화면 (`/kiosk/register`)

### 레이아웃
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
  <div className="w-full max-w-[600px] flex flex-col items-center gap-12">
    {/* 타이틀 */}
    {/* 설명 */}
    {/* 박스 아이콘 영역 */}
    {/* 시작하기 버튼 */}
    {/* 처음 화면으로 버튼 */}
  </div>
</div>
```

### 1. 타이틀
```tsx
<h1 className="text-6xl font-bold text-gray-800 text-center">
  분실물 등록
</h1>
```
- **크기**: `text-6xl` (60px)
- **색상**: `text-gray-800`

### 2. 설명
```tsx
<p className="text-3xl text-gray-600 text-center">
  분실물을 투입구에 넣어주세요
</p>
```
- **크기**: `text-3xl` (30px)
- **색상**: `text-gray-600`

### 3. 박스 아이콘 영역
```tsx
<div className="w-[400px] h-[250px] border-4 border-dashed border-gray-300 rounded-3xl bg-white flex items-center justify-center">
  <Package className="w-24 h-24 text-gray-300" />
</div>
```
- **크기**: 400px × 250px
- **테두리**: `border-4 border-dashed border-gray-300`
- **둥근 모서리**: `rounded-3xl`
- **아이콘**: Lucide `Package` 96px

### 4. 시작하기 버튼
```tsx
<button className="w-[250px] bg-sky-500 text-white py-5 rounded-full text-2xl font-bold hover:bg-sky-600 transition-colors">
  시작하기
</button>
```
- **너비**: 250px (고정)
- **높이**: `py-5` (80px)

### 5. 처음 화면으로 버튼
```tsx
<button className="w-[250px] bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-full text-xl font-semibold hover:bg-gray-50 transition-colors">
  처음 화면으로
</button>
```
- **너비**: 250px
- **높이**: `py-4` (64px)

---

## 📥 등록 플로우 2: 투입 화면 (`/kiosk/register/insert`)

### 레이아웃 (동일)

### 1. 타이틀
```tsx
<h1 className="text-6xl font-bold text-gray-800 text-center">
  투입구가 열렸습니다
</h1>
```

### 2. 설명
```tsx
<p className="text-3xl text-gray-600 text-center leading-relaxed">
  분실물을 넣고
  <br />
  투입 완료 버튼을 눌러주세요
</p>
```
- **2줄** 텍스트

### 3. 열린 박스 아이콘
```tsx
<div className="w-[400px] h-[250px] border-4 border-sky-500 rounded-3xl bg-white flex items-center justify-center">
  <PackageOpen className="w-20 h-20 text-sky-500" />
</div>
```
- **테두리**: `border-sky-500` (활성화 상태)
- **아이콘**: Lucide `PackageOpen` 또는 `Inbox` 80px, sky-500 색상

### 4. 투입 완료 버튼
```tsx
<button className="w-[250px] bg-sky-500 text-white py-5 rounded-full text-2xl font-bold hover:bg-sky-600 transition-colors">
  투입 완료
</button>
```

### 5. 처음 화면으로 버튼 (동일)

---

## ⏳ 등록 플로우 3: 분석 중 (`/kiosk/register/processing`)

### 레이아웃
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
  <div className="flex flex-col items-center gap-8">
    {/* 타이틀 */}
    {/* 설명 */}
    {/* 로딩 스피너 */}
  </div>
</div>
```

### 1. 타이틀
```tsx
<h1 className="text-6xl font-bold text-gray-800">
  분석 중
</h1>
```

### 2. 설명
```tsx
<p className="text-3xl text-gray-600">
  분실물을 인식하고 있어요...
</p>
```

### 3. 로딩 스피너
```tsx
<LoadingSpinner />
```
- 기존 프로젝트의 `LoadingSpinner` 컴포넌트 재사용

---

## ✅ 등록 플로우 4: 정보 확인 (`/kiosk/register/confirm`)

### 레이아웃
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center px-8 py-12">
  <div className="w-full max-w-[600px] flex flex-col gap-8">
    {/* 타이틀 */}
    {/* 설명 */}
    {/* 카드 영역 */}
    {/* 버튼 영역 */}
  </div>
</div>
```

### 1. 타이틀
```tsx
<h1 className="text-5xl font-bold text-gray-800">
  등록 정보 확인
</h1>
```
- **크기**: `text-5xl` (48px)

### 2. 설명
```tsx
<p className="text-2xl text-gray-600">
  인식된 정보가 맞는지 확인해주세요
</p>
```

### 3. 카드 영역
```tsx
<div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-6 shadow-lg">
  {/* 사진 */}
  <div className="w-[200px] h-[200px] bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
    <Smartphone className="w-16 h-16 text-gray-400" />
    {/* 실제 구현 시 이미지: <img src={photoUrl} /> */}
  </div>
  
  {/* 태그 */}
  <div className="flex gap-3">
    <span className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-lg font-medium">
      #휴대폰
    </span>
    <span className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-lg font-medium">
      #전자기기
    </span>
  </div>
  
  {/* 날짜 */}
  <p className="text-lg text-gray-600">
    9월 12일 발견
  </p>
  
  {/* 위치 */}
  <p className="text-xl text-gray-700 font-medium">
    📍 하이테크관 2층 분실물센터
  </p>
</div>
```

#### 카드 스타일
- **배경**: `bg-white`
- **둥근 모서리**: `rounded-3xl`
- **패딩**: `p-8`
- **그림자**: `shadow-lg`

#### 사진 영역
- **크기**: 200px × 200px
- **배경**: `bg-gray-100`
- **둥근 모서리**: `rounded-2xl`

#### 태그
- **배경**: `bg-sky-100`
- **텍스트**: `text-sky-700`
- **모양**: `rounded-full`
- **패딩**: `px-4 py-2`

### 4. 버튼 영역
```tsx
<div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto">
  <button className="w-full bg-sky-500 text-white py-4 rounded-full text-xl font-bold hover:bg-sky-600 transition-colors">
    네, 맞아요
  </button>
  
  <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-full text-xl font-semibold hover:bg-gray-50 transition-colors">
    아니요, 다시 할게요
  </button>
</div>
```

---

## 🎉 등록 플로우 5: 완료 (`/kiosk/register/complete`)

### 레이아웃
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
  <div className="flex flex-col items-center gap-10">
    {/* 체크 아이콘 */}
    {/* 타이틀 */}
    {/* 설명 */}
    {/* 새로운 등록 버튼 */}
    {/* 프로그레스 바 */}
  </div>
</div>
```

### 1. 체크 아이콘
```tsx
<div className="w-40 h-40 bg-sky-500 rounded-full flex items-center justify-center">
  <Check className="w-24 h-24 text-white stroke-[3]" />
</div>
```
- **배경**: 원형 `bg-sky-500`
- **크기**: 160px × 160px
- **아이콘**: Lucide `Check` 96px, 두께 3

### 2. 타이틀
```tsx
<h1 className="text-6xl font-bold text-gray-800">
  등록 완료
</h1>
```

### 3. 설명
```tsx
<p className="text-2xl text-gray-600 text-center leading-relaxed">
  분실물이 성공적으로 등록되었어요
  <br />
  안심하고 돌아가세요
</p>
```

### 4. 새로운 등록 버튼
```tsx
<button className="w-[300px] bg-sky-500 text-white py-5 rounded-full text-2xl font-bold hover:bg-sky-600 transition-colors">
  새로운 등록
</button>
```

### 5. 프로그레스 바
```tsx
<div className="w-[400px] mt-8">
  <p className="text-sm text-gray-500 text-center mb-2">
    5초 후 처음 화면으로 돌아갑니다
  </p>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-sky-500 h-2 rounded-full transition-all duration-1000"
      style={{ width: `${(5 - timeLeft) * 20}%` }}
    />
  </div>
</div>
```

---

## 🔢 찾기 플로우 1: 코드 입력 (`/kiosk/retrieve`)

### 레이아웃
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
  <div className="w-full max-w-[600px] flex flex-col gap-8">
    {/* 타이틀 */}
    {/* 설명 */}
    {/* PIN 입력 */}
    {/* 숫자 키패드 */}
    {/* 처음 화면으로 버튼 */}
  </div>
</div>
```

### 1. 타이틀
```tsx
<h1 className="text-6xl font-bold text-gray-800">
  분실물 수령
</h1>
```

### 2. 설명
```tsx
<p className="text-2xl text-gray-600 text-center leading-relaxed">
  홈페이지에서 발급받은
  <br />
  비밀번호 6자리를 입력해주세요
</p>
```

### 3. PIN 입력 박스
```tsx
<div className="flex justify-center gap-3 my-8">
  {[0, 1, 2, 3, 4, 5].map((index) => (
    <div
      key={index}
      className={cn(
        "w-16 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold",
        pinCode[index]
          ? "bg-sky-100 border-2 border-sky-500 text-sky-700"
          : "bg-white border-2 border-gray-300 text-transparent"
      )}
    >
      {pinCode[index] || "0"}
    </div>
  ))}
</div>
```

#### 입력 박스 (비어있을 때)
- **크기**: 64px × 80px
- **배경**: `bg-white`
- **테두리**: `border-2 border-gray-300`
- **모양**: `rounded-2xl`

#### 입력 박스 (입력되었을 때)
- **배경**: `bg-sky-100`
- **테두리**: `border-2 border-sky-500`
- **텍스트**: `text-sky-700`

### 4. 숫자 키패드
```tsx
<div className="grid grid-cols-3 gap-1 max-w-[600px] mx-auto">
  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
    <button
      key={num}
      className="h-20 bg-white hover:bg-gray-50 text-3xl font-semibold text-gray-800 transition-colors"
    >
      {num}
    </button>
  ))}
  
  {/* 지우기 버튼 */}
  <button className="h-20 bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors">
    <Delete className="w-7 h-7 text-red-500" />
  </button>
  
  {/* 0 버튼 */}
  <button className="h-20 bg-white hover:bg-gray-50 text-3xl font-semibold text-gray-800 transition-colors">
    0
  </button>
  
  {/* 확인 버튼 */}
  <button className="h-20 bg-sky-50 hover:bg-sky-100 text-xl font-bold text-sky-600 transition-colors">
    확인
  </button>
</div>
```

#### 키패드 레이아웃
- **그리드**: 3×4 (3열 4행)
- **간격**: `gap-1` (4px)
- **버튼 높이**: `h-20` (80px)
- **배경**: `bg-white`
- **호버**: `hover:bg-gray-50`

#### 특수 버튼
- **지우기**: `bg-red-50`, 빨간 삭제 아이콘
- **확인**: `bg-sky-50`, "확인" 텍스트

### 5. 처음 화면으로 버튼
```tsx
<button className="w-full max-w-[400px] mx-auto bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-full text-xl font-semibold hover:bg-gray-50 transition-colors">
  처음 화면으로
</button>
```

---

## ⏳ 찾기 플로우 2: 확인 중 (`/kiosk/retrieve/verifying`)

### 레이아웃 (분석 중과 동일)

### 1. 타이틀
```tsx
<h1 className="text-6xl font-bold text-gray-800">
  코드 확인 중
</h1>
```

### 2. 설명
```tsx
<p className="text-3xl text-gray-600">
  잠시만 기다려주세요...
</p>
```

### 3. 로딩 스피너
```tsx
<LoadingSpinner />
```

---

## ⚠️ 찾기 플로우 3: 코드 오류 (`/kiosk/retrieve/error`)

### 레이아웃
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
  <div className="flex flex-col items-center gap-10">
    {/* 경고 아이콘 */}
    {/* 타이틀 */}
    {/* 설명 */}
    {/* 다시 시도 버튼 */}
  </div>
</div>
```

### 1. 경고 아이콘
```tsx
<div className="w-40 h-40 bg-orange-500 rounded-full flex items-center justify-center">
  <AlertCircle className="w-24 h-24 text-white stroke-[3]" />
</div>
```
- **배경**: `bg-orange-500` (경고 색상)
- **아이콘**: Lucide `AlertCircle`

### 2. 타이틀
```tsx
<h1 className="text-6xl font-bold text-gray-800">
  코드를 확인해주세요
</h1>
```

### 3. 설명
```tsx
<p className="text-2xl text-gray-600 text-center leading-relaxed">
  입력하신 코드를 확인할 수 없습니다
  <br />
  다시 입력해주세요
</p>
```

### 4. 다시 시도 버튼
```tsx
<button className="w-[300px] bg-orange-500 text-white py-5 rounded-full text-2xl font-bold hover:bg-orange-600 transition-colors">
  다시 시도
</button>
```
- **배경**: `bg-orange-500` (경고 색상 유지)

---

## 🔓 찾기 플로우 4: 사물함 개방 (`/kiosk/retrieve/locker`)

### 레이아웃
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
  <div className="flex flex-col items-center gap-10">
    {/* 자물쇠 아이콘 */}
    {/* 타이틀 */}
    {/* 설명 */}
    {/* 수령 완료 버튼 */}
  </div>
</div>
```

### 1. 자물쇠 아이콘
```tsx
<div className="w-40 h-40 bg-green-500 rounded-full flex items-center justify-center">
  <LockOpen className="w-24 h-24 text-white stroke-[3]" />
</div>
```
- **배경**: `bg-green-500` (성공 색상)
- **아이콘**: Lucide `LockOpen` 또는 `Unlock`

### 2. 타이틀
```tsx
<h1 className="text-6xl font-bold text-gray-800">
  사물함 3번이 열렸습니다
</h1>
```

### 3. 설명
```tsx
<p className="text-2xl text-gray-600 text-center leading-relaxed">
  분실물을 수령하신 후
  <br />
  문을 닫아주세요
</p>
```

### 4. 수령 완료 버튼
```tsx
<button className="w-[300px] bg-green-500 text-white py-5 rounded-full text-2xl font-bold hover:bg-green-600 transition-colors">
  수령 완료
</button>
```
- **배경**: `bg-green-500`

---

## 🎉 찾기 플로우 5: 완료 (`/kiosk/retrieve/complete`)

### 레이아웃
```tsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
  <div className="flex flex-col items-center gap-10">
    {/* 축하 아이콘 */}
    {/* 메시지 */}
    {/* 프로그레스 바 */}
  </div>
</div>
```

### 1. 축하 아이콘
```tsx
<div className="w-40 h-40 bg-sky-500 rounded-full flex items-center justify-center">
  <PartyPopper className="w-24 h-24 text-white" />
</div>
```
- **아이콘**: Lucide `PartyPopper` 또는 `Sparkles`

### 2. 메시지
```tsx
<div className="text-center">
  <h1 className="text-5xl font-bold text-gray-800 mb-4">
    이용해 주셔서 감사합니다
  </h1>
  <p className="text-2xl text-gray-600">
    잠시 후 처음 화면으로
    <br />
    돌아갑니다
  </p>
</div>
```

### 3. 프로그레스 바 (등록 완료와 동일)

---

## 🎨 색상 매핑표

| Figma 색상 | 용도 | Tailwind 클래스 | HEX |
|-----------|------|----------------|-----|
| #4caf50 | Primary (녹색) | `sky-500` | 프로젝트 표준 |
| #6c757d | Secondary (회색) | `gray-500` | #6b7280 |
| #2c3e50 | 텍스트 (진한 회색) | `gray-800` | #1f2937 |
| #f8f9fa | 배경 (밝은 회색) | `gray-50` | #f9fafb |

**중요**: Figma의 #4caf50 녹색을 프로젝트 표준인 `sky-500`로 대체

---

## 📏 크기 매핑표

| Figma 크기 | 용도 | Tailwind 클래스 | 실제 크기 |
|-----------|------|----------------|---------|
| 72px | Hero 타이틀 | `text-7xl` | 72px |
| 60px | 페이지 타이틀 | `text-6xl` | 60px |
| 48px | 서브 타이틀 | `text-5xl` | 48px |
| 36px | 부제 | `text-4xl` | 36px |
| 30px | 본문 (큰) | `text-3xl` | 30px |
| 24px | 본문 (중간) | `text-2xl` | 24px |
| 20px | 본문 (작은) | `text-xl` | 20px |
| 16px | 캡션 | `text-base` | 16px |

---

## 📐 간격 매핑표

| Figma 간격 | 용도 | Tailwind 클래스 | 실제 크기 |
|-----------|------|----------------|---------|
| 48px | 섹션 간 | `gap-12` | 48px |
| 32px | 요소 간 | `gap-8` | 32px |
| 24px | 작은 간격 | `gap-6` | 24px |
| 16px | 최소 간격 | `gap-4` | 16px |
| 12px | 밀착 간격 | `gap-3` | 12px |

---

## 📱 반응형 전략

### 기본 원칙
```tsx
// 최대 너비 제한
<div className="max-w-[768px] mx-auto">

// 양쪽 패딩
<div className="px-8">

// 최소 높이
<div className="min-h-screen">
```

### 버튼 크기
- **큰 버튼**: `py-6` (총 96px 높이)
- **중간 버튼**: `py-5` (총 80px 높이)
- **작은 버튼**: `py-4` (총 64px 높이)

### 터치 영역
- 모든 버튼 최소 `h-16` (64px) 보장
- 키패드 버튼 `h-20` (80px)

---

## 🔤 타이포그래피

### 폰트 굵기
- **Bold**: `font-bold` (700) - 타이틀
- **Semibold**: `font-semibold` (600) - 버튼
- **Medium**: `font-medium` (500) - 본문 강조

### 줄 간격
- **타이틀**: `leading-tight` (1.25)
- **본문**: `leading-relaxed` (1.625)
- **기본**: `leading-normal` (1.5)

---

## 🎭 아이콘 가이드

| 화면 | 아이콘 | 크기 | 색상 |
|-----|-------|------|------|
| 등록 대기 | `Package` | 96px | gray-300 |
| 등록 투입 | `PackageOpen` | 80px | sky-500 |
| 등록 완료 | `Check` | 96px | white (배경 sky-500) |
| 코드 오류 | `AlertCircle` | 96px | white (배경 orange-500) |
| 사물함 개방 | `LockOpen` | 96px | white (배경 green-500) |
| 이용 완료 | `PartyPopper` | 96px | white (배경 sky-500) |
| 키패드 지우기 | `Delete` | 28px | red-500 |

---

## 🔗 페이지 라우팅

```
/kiosk                          → 초기 화면
/kiosk/register                 → 등록 대기
/kiosk/register/insert          → 등록 투입
/kiosk/register/processing      → 등록 분석 중
/kiosk/register/confirm         → 등록 정보 확인
/kiosk/register/complete        → 등록 완료

/kiosk/retrieve                 → 찾기 코드 입력
/kiosk/retrieve/verifying       → 찾기 확인 중
/kiosk/retrieve/error           → 찾기 코드 오류
/kiosk/retrieve/locker          → 찾기 사물함 개방
/kiosk/retrieve/complete        → 찾기 완료
```

---

## ⚡ 구현 우선순위

### Phase 1 (필수)
1. ✅ 초기 화면
2. ✅ 등록 대기 화면
3. ✅ 찾기 코드 입력 화면

### Phase 2 (핵심)
4. ✅ 숫자 키패드 컴포넌트
5. ✅ PIN 입력 컴포넌트
6. ✅ 등록/찾기 완료 화면

### Phase 3 (완성)
7. ✅ 나머지 중간 화면들
8. ✅ 페이지 간 전환 로직
9. ✅ 자동 복귀 타이머

---

**이 명세서를 정확히 따르면 Figma 디자인과 동일한 결과물을 얻을 수 있습니다.**
