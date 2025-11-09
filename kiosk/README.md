# 키오스크 구현 문서 패키지

> Figma 디자인을 Next.js + Tailwind로 완벽하게 구현하기 위한 완전한 명세서

---

## 📦 문서 개요

이 패키지는 **인하대 분실물 키오스크** UI를 구현하기 위한 4가지 핵심 문서로 구성되어 있습니다.

### 문서 읽는 순서

```
1. README.md (지금 읽고 있는 파일) ← START
   ↓
2. KIOSK_DEVELOPMENT_GUIDE.md (프로젝트 설정 정보)
   ↓
3. KIOSK_FIGMA_SPEC.md (디자인 명세서) ⭐ 가장 중요
   ↓
4. COMPONENTS_SPEC.md (컴포넌트 상세)
   ↓
5. FLOW_DIAGRAM.md (화면 전환 흐름)
   ↓
6. IMPLEMENTATION_GUIDE.md (단계별 구현)
```

---

## 📄 각 문서의 역할

### 1. KIOSK_DEVELOPMENT_GUIDE.md
**내용**: 프로젝트 기본 정보
- 기술 스택 (Next.js 15, React 19, Tailwind 4)
- 코딩 스타일 규칙
- 파일명 컨벤션
- API 연동 가이드

**언제 보나**: 프로젝트 구조 확인 필요 시

---

### 2. KIOSK_FIGMA_SPEC.md ⭐
**내용**: Figma 디자인의 완벽한 복제 명세
- 11개 화면의 모든 요소 상세 설명
- 정확한 텍스트, 크기, 색상, 간격
- Tailwind 클래스로 변환된 스타일
- 복사-붙여넣기 가능한 코드 예시

**언제 보나**: 각 페이지 구현 시 (가장 많이 참고)

**핵심 내용**:
```
✅ 초기 화면 - "인하대 분실물 키오스크"
✅ 등록 플로우 5단계
✅ 찾기 플로우 5단계
✅ 색상 매핑표 (Figma → Tailwind)
✅ 크기 매핑표 (px → text-*)
```

---

### 3. COMPONENTS_SPEC.md
**내용**: 재사용 가능한 컴포넌트 명세
- 6개 공통 컴포넌트 전체 코드
- Props 타입 정의
- 사용 예시

**언제 보나**: 컴포넌트 구현 시

**포함된 컴포넌트**:
1. KioskLayout - 공통 레이아웃
2. KioskButton - Primary/Secondary/Warning/Success 버튼
3. StatusIcon - 완료/오류/경고 아이콘
4. PinInput - 6자리 PIN 입력
5. NumPad - 숫자 키패드
6. ProgressTimer - 자동 복귀 타이머

---

### 4. FLOW_DIAGRAM.md
**내용**: 화면 전환과 상태 관리
- 전체 플로우 다이어그램
- 각 화면 간 전환 로직
- 상태 관리 패턴
- 에러 처리 시나리오

**언제 보나**: 페이지 간 이동 로직 구현 시

**핵심 내용**:
```
등록 플로우: 대기 → 투입 → 분석 → 확인 → 완료
찾기 플로우: 입력 → 확인 → (성공/실패) → 완료
```

---

### 5. IMPLEMENTATION_GUIDE.md
**내용**: 단계별 구현 가이드
- Phase 1: 프로젝트 설정 (30분)
- Phase 2: 공통 컴포넌트 (2시간)
- Phase 3: 페이지 구현 (4시간)
- Phase 4: 통합 & 최적화 (1시간)

**언제 보나**: 구현 시작 전, 진행 상황 체크

---

## 🎯 빠른 시작 가이드

### Step 1: 프로젝트 정보 확인
```bash
# KIOSK_DEVELOPMENT_GUIDE.md 읽기
- Next.js 버전 확인
- 디렉토리 구조 파악
- 코딩 스타일 숙지
```

### Step 2: 컴포넌트 먼저 만들기
```bash
# COMPONENTS_SPEC.md 보며 작업
1. KioskLayout.tsx
2. KioskButton.tsx
3. 나머지 컴포넌트들...
```

### Step 3: 페이지 구현
```bash
# KIOSK_FIGMA_SPEC.md 보며 작업
1. /kiosk/page.tsx (초기 화면)
2. /kiosk/register/* (등록 5단계)
3. /kiosk/retrieve/* (찾기 5단계)
```

### Step 4: 통합 테스트
```bash
# IMPLEMENTATION_GUIDE.md의 체크리스트 확인
- 전체 플로우 테스트
- 자동 전환 확인
- 에러 처리 확인
```

---

## 📊 화면 구성

### 총 11개 페이지

```
/kiosk                          (초기 화면)

/kiosk/register                 (등록 대기)
/kiosk/register/insert          (투입)
/kiosk/register/processing      (분석 중)
/kiosk/register/confirm         (정보 확인)
/kiosk/register/complete        (등록 완료)

/kiosk/retrieve                 (코드 입력)
/kiosk/retrieve/verifying       (확인 중)
/kiosk/retrieve/error           (코드 오류)
/kiosk/retrieve/locker          (사물함 개방)
/kiosk/retrieve/complete        (완료)
```

---

## 🎨 디자인 시스템 요약

### 색상
```typescript
Primary: sky-500     // 주요 액션
Secondary: gray-300  // 보조 액션
Success: green-500   // 성공 상태
Warning: orange-500  // 경고 상태
Error: red-500       // 오류 상태
```

### 크기
```typescript
Hero: text-7xl (72px)     // 메인 타이틀
Title: text-6xl (60px)    // 페이지 타이틀
Heading: text-4xl (36px)  // 부제
Body: text-2xl (24px)     // 본문
Caption: text-xl (20px)   // 설명
```

### 버튼
```typescript
Large: py-6 (96px 높이)   // 메인 액션
Medium: py-5 (80px 높이)  // 일반 액션
Small: py-4 (64px 높이)   // 보조 액션
```

---

## ⚡ 구현 우선순위

### 🔴 Phase 1 (필수) - 2-3시간
```
✅ 컴포넌트 6개
✅ 초기 화면
✅ 등록 대기 화면
✅ 찾기 입력 화면
```

### 🟡 Phase 2 (핵심) - 3-4시간
```
✅ 등록 플로우 나머지 4단계
✅ 찾기 플로우 나머지 4단계
✅ 페이지 간 전환 로직
```

### 🟢 Phase 3 (완성) - 1-2시간
```
✅ 자동 전환 (processing, verifying)
✅ 자동 복귀 (complete)
✅ 에러 처리
✅ 최적화
```

---

## 🧪 테스트 체크리스트

### 기능 테스트
- [ ] 초기 화면 → 등록/찾기 버튼 동작
- [ ] 등록 플로우 전체 완주 (5단계)
- [ ] 찾기 플로우 성공 시나리오
- [ ] 찾기 플로우 실패 시나리오
- [ ] "처음 화면으로" 버튼 모든 화면 동작
- [ ] 자동 전환 (2초, 1.5초) 확인
- [ ] 자동 복귀 (5초) 확인

### UI 테스트
- [ ] 모든 텍스트 Figma와 일치
- [ ] 색상 정확히 적용
- [ ] 버튼 크기 최소 64px
- [ ] 텍스트 크기 최소 20px
- [ ] 터치 영역 충분

### 코드 품질
- [ ] TypeScript 에러 없음
- [ ] 'use client' 적절히 사용
- [ ] 불필요한 console.log 제거
- [ ] 컴포넌트 재사용성 확인

---

## 📚 참고 자료

### 외부 링크
- [Figma 원본](https://www.figma.com/design/uS2lniVrykGSmFsE2MwYae)
- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

### 프로젝트 문서
- `docs/ui-design-spec.txt` - UI 디자인 명세
- `src/lib/types/lostItem.ts` - 기존 타입 정의
- `openapi.json` - API 명세

---

## 🆘 문제 해결

### 자주 묻는 질문

**Q: Figma 색상이 프로젝트 색상과 다른데요?**
```
A: Figma #4caf50 (녹색) → 프로젝트 sky-500로 변경
   프로젝트 표준을 따르세요.
```

**Q: 숫자 키패드가 복잡한데 쉬운 방법은?**
```
A: COMPONENTS_SPEC.md의 NumPad 전체 코드 복사-붙여넣기
```

**Q: 자동 전환이 안 되는데요?**
```
A: useEffect에 router를 의존성 배열에 추가했는지 확인
```

**Q: 타입 에러가 계속 나와요**
```
A: types/kiosk.ts 파일을 먼저 생성했는지 확인
```

---

## ✅ 완성도 확인

### 모든 단계 완료 시

```bash
✅ 11개 페이지 모두 구현
✅ 6개 컴포넌트 재사용 가능
✅ 등록 플로우 완주 테스트 통과
✅ 찾기 플로우 완주 테스트 통과
✅ 자동 전환 모두 작동
✅ 에러 처리 구현
✅ TypeScript 에러 0개
✅ Figma 디자인과 시각적으로 동일
```

---

## 🎉 최종 결과물

구현 완료 시 다음을 얻게 됩니다:

1. **완벽한 Figma 복제**
   - 픽셀 퍼펙트 레이아웃
   - 정확한 색상과 간격
   - 동일한 타이포그래피

2. **완전한 기능**
   - 등록/찾기 전체 플로우
   - 자동 전환 및 복귀
   - 에러 처리

3. **재사용 가능한 코드**
   - 6개 공통 컴포넌트
   - 타입 안전성
   - 유지보수 용이

4. **프로덕션 준비**
   - 메타데이터 설정
   - 에러 바운더리
   - 로딩 상태

---

## 📞 도움말

문서를 읽으며 막히는 부분이 있다면:

1. 해당 섹션을 다시 천천히 읽기
2. 예시 코드를 그대로 복사-붙여넣기
3. 체크리스트로 빠진 부분 확인
4. IMPLEMENTATION_GUIDE.md의 문제 해결 섹션 참고

---

## 🚀 시작하기

준비되었다면 지금 바로 시작하세요!

```bash
1. KIOSK_DEVELOPMENT_GUIDE.md 읽기
2. 프로젝트 디렉토리 구조 생성
3. COMPONENTS_SPEC.md 보며 컴포넌트 구현
4. KIOSK_FIGMA_SPEC.md 보며 페이지 구현
5. IMPLEMENTATION_GUIDE.md 체크리스트 확인
```

---

**Good luck! 🎉**

Figma 디자인과 동일한 멋진 키오스크를 만들어보세요!
