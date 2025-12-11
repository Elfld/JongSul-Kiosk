# 🏢 인하대 분실물 키오스크 시스템

> 24시간 무인 분실물 등록/수령 키오스크

![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.2.1-61dafb?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38bdf8?style=flat-square&logo=tailwind-css)

---

## 📖 프로젝트 소개

**인하대 분실물 키오스크**는 학교 내 분실물을 24시간 자동으로 등록하고 수령할 수 있는 무인 키오스크 시스템입니다.

### 주요 특징
- 🤖 **무인 자동화**: 관리자 없이 24시간 운영
- 📷 **자동 촬영 및 분류**: AI 기반 분실물 자동 인식
- 🔐 **안전한 보관**: 사물함 자동 배정 및 PIN 코드 관리
- 📱 **직관적인 UI**: 누구나 쉽게 사용할 수 있는 터치 인터페이스
- 🎨 **반응형 디자인**: iPad Air 4 (1640x2360) 고해상도 최적화

---

## ✨ 주요 기능

### 1️⃣ 분실물 등록 플로우

```
투입구에 분실물 넣기 → 등록 버튼 클릭 → 자동 촬영 및 AI 분류 → 등록 완료
```

- **간편한 등록**: 분실물을 투입구에 넣고 버튼 클릭만으로 등록
- **자동 촬영**: 서버에 촬영 요청 후 자동으로 사진 촬영
- **AI 분류**: 분실물 카테고리 자동 인식 (카드, 지갑, 핸드폰 등)
- **정보 표시**: 사진, 카테고리, 등록 일시, 위치 정보 확인

### 2️⃣ 분실물 수령 플로우

```
PIN 코드 입력 → 검증 → 사물함 자동 개방 → 수령 완료
```

- **PIN 코드 입력**: 6자리 숫자 키패드로 간편 입력
- **자동 검증**: 서버 연동하여 코드 유효성 확인
- **사물함 개방**: 해당 사물함 자동 개방 및 안내
- **수령 확인**: 사물함 닫기 후 수령 완료 처리

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: [Next.js 15.5.7](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library**: [React 19.2.1](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Build & Dev Tools
- **Build Tool**: Turbopack (Next.js 내장)
- **Linting**: ESLint 9
- **Package Manager**: npm

### Backend Integration
- **API Communication**: RESTful API (Fetch API)
- **Image Handling**: Next.js Image Optimization
- **Error Handling**: 사용자 친화적 메시지 + 개발자 로깅 분리

---

## 📂 프로젝트 구조

```
JongSul-Kiosk/
├── src/
│   ├── app/
│   │   ├── page.tsx                   # 메인 페이지 (등록/수령 선택)
│   │   ├── register/
│   │   │   └── page.tsx               # 등록 플로우 메인
│   │   ├── retrieve/
│   │   │   └── page.tsx               # 수령 플로우 메인
│   │   ├── api/
│   │   │   └── health/
│   │   │       └── route.ts           # Health Check API
│   │   ├── layout.tsx                 # 루트 레이아웃
│   │   ├── error.tsx                  # 에러 페이지
│   │   └── loading.tsx                # 로딩 페이지
│   │
│   ├── components/
│   │   ├── kiosk/
│   │   │   ├── Card.tsx               # 카드 컴포넌트
│   │   │   ├── KioskButton.tsx        # 키오스크 버튼
│   │   │   ├── KioskLayout.tsx        # 키오스크 레이아웃
│   │   │   ├── NumPad.tsx             # 숫자 키패드
│   │   │   ├── PinInput.tsx           # PIN 입력 표시
│   │   │   ├── ProgressTimer.tsx      # 진행 타이머
│   │   │   ├── StatusIcon.tsx         # 상태 아이콘
│   │   │   ├── register/
│   │   │   │   ├── WaitScreen.tsx          # 등록 대기 화면
│   │   │   │   ├── ProcessingScreen.tsx    # 등록 처리 중
│   │   │   │   └── CompleteScreen.tsx      # 등록 완료
│   │   │   └── retrieve/
│   │   │       ├── InputScreen.tsx         # PIN 입력 화면
│   │   │       ├── VerifyingScreen.tsx     # 검증 중
│   │   │       ├── ErrorScreen.tsx         # 에러 화면
│   │   │       ├── LockerScreen.tsx        # 사물함 개방
│   │   │       └── CompleteScreen.tsx      # 수령 완료
│   │   └── LoadingSpinner.tsx         # 로딩 스피너
│   │
│   └── lib/
│       ├── api/
│       │   ├── client.ts              # API 클라이언트 (공통)
│       │   └── kiosk.ts               # 키오스크 API 서비스
│       ├── types/
│       │   └── kiosk.ts               # TypeScript 타입 정의
│       └── utils/
│           └── index.ts               # 유틸리티 함수
│
├── docs/
│   ├── API_INTEGRATION_PLAN.md        # API 연동 계획서
│   ├── KIOSK_API_SPEC.md              # API 명세서
│   └── KIOSK_DEVELOPMENT_GUIDE.md     # 개발 가이드
│
├── openapi.json                       # OpenAPI 명세
├── package.json
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 시작하기

### 요구사항
- Node.js 20 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/Elfld/JongSul-Kiosk.git
cd JongSul-Kiosk

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 환경 변수 설정

외부 API 서버를 사용하려면 환경 변수를 설정해야 합니다:

```bash
# .env.local 파일 생성
cp .env.local.example .env.local

# .env.local 파일 편집
NEXT_PUBLIC_API_URL=https://your-api-server.com
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

---

## 🎨 UI/UX 특징

### 고해상도 최적화
- **타겟 디바이스**: iPad Air 4 (1640x2360 세로 모드)
- **반응형 폰트**: `clamp(min, prefer, max)` 활용
- **터치 최적화**: `touch-manipulation`, `select-none` 적용
- **시각적 피드백**: 버튼 hover/active 상태 명확화

### 사용자 경험
- **직관적인 플로우**: 최소한의 단계로 작업 완료
- **명확한 안내**: 각 단계별 친절한 가이드 메시지
- **에러 처리**: 기술 용어 없이 사용자 친화적 메시지 표시
- **자동 복귀**: 일정 시간 후 자동으로 메인 화면 복귀

---

## 🔌 API 연동

### 주요 엔드포인트

#### 1. 분실물 등록 요청
```http
POST /kiosk/register/request
Content-Type: application/json

{
  "device_name": "KIOSK-01",
  "location": "60주년 기념관"
}
```

**응답**
```json
{
  "status": "success",
  "message": "처리 완료",
  "category": "카드",
  "image_url": "https://..."
}
```

#### 2. 분실물 수령 (PIN 검증)
```http
POST /kiosk/pickup
Content-Type: application/json

{
  "pickup_code": "123456"
}
```

**응답**
```json
{
  "message": "수령 가능합니다",
  "item": {
    "id": 1,
    "locker_id": 3,
    "photo_url": "https://...",
    "status": "stored"
  }
}
```

#### 3. 사물함 닫기
```http
POST /kiosk/locker/close
Content-Type: application/json

{
  "pickup_code": "123456"
}
```

자세한 API 명세는 [docs/KIOSK_API_SPEC.md](docs/KIOSK_API_SPEC.md) 참조

---

## 📱 사용 시나리오

### 분실물 등록
1. 학생 A가 강의실에서 분실물 발견
2. 키오스크에서 "분실물 등록" 선택
3. 투입구에 분실물 넣고 "등록하기" 버튼 클릭
4. 자동 촬영 및 AI 분류 (예: "핸드폰")
5. 등록 완료 확인 (사진, 카테고리, 일시, 위치)

### 분실물 수령
1. 학생 B가 분실물 등록 알림 수신 (PIN: 123456)
2. 키오스크에서 "분실물 찾기" 선택
3. 6자리 PIN 코드 입력
4. 사물함 3번 자동 개방
5. 분실물 수령 후 사물함 닫기
6. 수령 완료

---

## 🧪 테스트

### 로컬 테스트
```bash
# 빌드 확인
npm run build

# ESLint 검사
npm run lint
```

### 플로우 테스트 체크리스트
- [ ] 메인 화면 → 등록/수령 버튼 동작
- [ ] 등록 플로우: 대기 → 처리 → 완료
- [ ] 수령 플로우: 입력 → 검증 → 사물함 → 완료
- [ ] 에러 처리: 네트워크 오류, 잘못된 PIN 등
- [ ] 자동 복귀: 타임아웃 후 메인 화면 복귀

---

## 🤝 기여

이 프로젝트는 인하대학교 캡스톤 디자인 프로젝트입니다.

### 커밋 메시지 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
style: 코드 포맷팅, UI 스타일 변경
docs: 문서 수정
chore: 빌드 설정, 패키지 관리
```

---

## 📄 라이선스

This project is licensed under the MIT License.

---

## 👥 팀

- **개발**: 종설팀
- **디자인**: Figma 기반 UI/UX
- **백엔드 연동**: RESTful API

---

## 📞 문의

- GitHub Issues: [https://github.com/Elfld/JongSul-Kiosk/issues](https://github.com/Elfld/JongSul-Kiosk/issues)

---

**Last Updated**: 2025-12-11
**Version**: 1.0.0
