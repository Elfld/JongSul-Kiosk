# 키오스크 페이지 개발 가이드

> 다른 Claude가 Figma 기반으로 키오스크 페이지를 생성할 때 필요한 프로젝트 정보

---

## 1. 기술 스택

- **Next.js 15.5.4** (App Router)
- **React 19.1.0**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Lucide React** (아이콘)

---

## 2. 코딩 스타일

### 파일 구조
```typescript
'use client';  // 모든 인터랙티브 컴포넌트 최상단에 필수

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // 라우팅
import { 아이콘명 } from 'lucide-react';      // 아이콘

export default function ComponentName() {
  // 로직
  return (
    // JSX
  );
}
```

### 파일명 컨벤션
- **컴포넌트**: `PascalCase.tsx` (예: `KioskMain.tsx`)
- **Hook**: `use*.ts` (예: `useKioskFlow.ts`)
- **타입**: `lostItem.ts` 같은 파일에 정의

### TypeScript 타입 위치
```typescript
// src/lib/types/lostItem.ts 에 추가
export interface KioskStep {
  // 키오스크 관련 타입 정의
}
```

---

## 3. Tailwind 설정

### 기본 설정
- **커스텀 테마 없음** - Tailwind 기본 팔레트 사용
- **주요 색상**: `sky-50` ~ `sky-700`
- **기본 폰트**: 시스템 sans-serif

### 커스텀 유틸리티
```css
/* 이미 정의된 것만 사용 가능 */
.scrollbar-hide  /* 스크롤바 숨김 */
```

---

## 4. 상태 관리 & 라우팅

### 상태 관리
```typescript
// 전역 상태 관리 없음 - useState만 사용
const [step, setStep] = useState<string>('main');
```

### 페이지 이동
```typescript
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/kiosk');     // 페이지 이동
router.back();             // 뒤로 가기
```

---

## 5. 키오스크 특수 요구사항

### UI 디자인 규칙
```typescript
// 1. 큰 터치 영역
className="h-16 px-8"  // 최소 64px 높이
className="text-2xl"   // 큰 텍스트

// 2. 넓은 간격
className="gap-8"      // 컴포넌트 간 32px
className="p-8"        // 패딩 32px

// 3. 풀스크린 레이아웃
className="min-h-screen"  // 전체 화면
className="flex items-center justify-center"  // 중앙 정렬

// 4. Primary 버튼 스타일
className="w-full bg-sky-500 text-white py-4 rounded-full text-xl font-bold hover:bg-sky-600 transition-colors"

// 5. Secondary 버튼 스타일
className="w-full bg-gray-100 text-gray-700 py-4 rounded-full text-xl font-semibold hover:bg-gray-200 transition-colors"
```

### 자동 복귀 타이머 구현
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    router.push('/kiosk');  // 5초 후 메인으로
  }, 5000);

  return () => clearTimeout(timer);
}, []);
```

### 프로그레스 바 예시
```typescript
<div className="w-full bg-gray-200 rounded-full h-2">
  <div className="bg-sky-500 h-2 rounded-full transition-all duration-300" style={{ width: '33%' }}></div>
</div>
```

---

## 6. API 연동 가이드

### 서비스 레이어 패턴
```typescript
// src/lib/api/kiosk.ts 생성
export class KioskService {
  // 분실물 등록 (예정)
  static async registerItem(data: FormData): Promise<ItemResponse> {
    return ApiClient.post<ItemResponse>('/api/items', data);
  }

  // 수령 코드 검증 (예정)
  static async verifyPickupCode(code: string): Promise<PickupResponse> {
    return ApiClient.post<PickupResponse>('/api/items/pickup', { code });
  }
}
```

### API 응답 타입 (OpenAPI 기반)
```typescript
// src/lib/types/lostItem.ts 에 추가
export interface PickupCodeResponse {
  code: string;          // 6자리 코드
  expires_at: string;    // ISO datetime
}

export interface ClaimResponse {
  item: ItemResponse;
  pickup_code: PickupCodeResponse;
}
```

### 현재 사용 가능한 API
```
GET  /api/items              # 전체 분실물 조회
GET  /api/items/search       # 검색 (q, tags)
GET  /api/tags               # 태그 목록
POST /api/items/{id}/claim   # 주인 등록 (인증 필요)
```

---

## 7. 키오스크 플로우 UI 명세

### 분실물 등록 플로우 (5단계)

#### 1. 등록 대기 화면
- "시작하기" 버튼
- "처음 화면으로" 버튼

#### 2. 투입 지시 화면
- 📦 아이콘
- "분실물을 투입구에 넣어주세요"
- "투입 완료" 버튼

#### 3. 분석 대기 화면
- ⏳ "분석 중..."
- LoadingSpinner 컴포넌트 재사용

#### 4. 분석 완료 화면
- 촬영된 사진 (photo_url)
- AI 분석 태그 (#핸드폰 #전자기기)
- 날짜/위치 표시
- "확인" / "다시하기" 버튼

#### 5. 등록 완료 화면
- ✅ 아이콘
- "등록 완료!"
- "새로운 등록" 버튼
- 5초 자동 복귀 타이머

---

### 분실물 수령 플로우 (5단계)

#### 1. 수령 코드 입력 화면
- 6자리 PIN 입력 박스
- 숫자 키패드 (0-9, 지우기, 확인)

#### 2. 코드 검증 대기 화면
- ⏳ "코드 확인 중..."
- LoadingSpinner

#### 3. 코드 오류 화면 (실패 시)
- ⚠️ 아이콘
- "코드가 일치하지 않습니다"
- "다시 시도" 버튼

#### 4. 사물함 개방 화면 (성공 시)
- 🔓 아이콘
- "사물함 #12번 개방"
- "수령 완료" 버튼

#### 5. 이용 종료 화면
- 🎉 아이콘
- "이용해 주셔서 감사합니다!"
- 프로그레스 바 + 5초 자동 복귀

---

## 8. 재사용 가능한 컴포넌트

### LoadingSpinner
```typescript
// 이미 존재하는 컴포넌트
import LoadingSpinner from '@/components/LoadingSpinner';

// 사용 예시
{loading && <LoadingSpinner />}
```

### 아이콘 사용법
```typescript
import { Search, User, X, Home } from 'lucide-react';

<Search className="w-5 h-5 text-sky-400" />
```

---

## 9. 페이지 경로

### 키오스크 메인 페이지
- **파일**: `src/app/kiosk/page.tsx`
- **URL**: `/kiosk`

### 메타데이터 설정
```typescript
// src/app/kiosk/page.tsx 상단
export const metadata = {
  title: '분실물 키오스크',
  description: '인하대 분실물 등록 및 수령',
};
```

---

## 10. 키오스크 디자인 원칙

### 터치 최적화
- 모든 버튼 최소 `h-16` (64px) 이상
- 간격 `gap-8` 이상 (32px)
- 텍스트 크기 `text-xl` 이상

### 명확한 시각적 피드백
- 모든 액션에 로딩 상태 표시
- 이모지 활용 (📦, ✅, ⚠️, 🔓, 🎉 등)
- 명확한 색상 구분 (sky-500 primary, gray-100 secondary)

### 자동 복귀 기능
- 모든 완료 화면에서 5초 후 메인으로
- 타이머 시각화 (프로그레스 바)

### 풀스크린 레이아웃
- `min-h-screen` 필수
- 스크롤 최소화 (한 화면에 모든 정보)
- 중앙 정렬 (`flex items-center justify-center`)

---

## 11. 참고 파일

- **UI 명세**: `docs/ui-design-spec.txt`
- **기존 타입 정의**: `src/lib/types/lostItem.ts`
- **API 클라이언트**: `src/lib/api/client.ts`
- **OpenAPI 명세**: `openapi.json`
