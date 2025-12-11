# 📋 레포지토리 정리 보고서

> 발표용 프로젝트 제출을 위한 코드베이스 정리 항목

생성일: 2025-12-11

---

## 🗑️ 1. 삭제 권장 파일

### 1.1 사용하지 않는 컴포넌트 (필수 삭제)
```
src/components/kiosk/register/InsertScreen.tsx
src/components/kiosk/register/ConfirmScreen.tsx
```
**사유:**
- 등록 플로우 단순화로 더 이상 사용하지 않음 (5단계 → 3단계)
- `src/components/kiosk/register/index.ts`에서 이미 export 제거됨
- 총 177줄의 사용하지 않는 코드

**확인 방법:**
```bash
# 코드베이스에서 import 여부 확인
grep -r "InsertScreen" src/app
grep -r "ConfirmScreen" src/app
# → 결과 없음 확인됨
```

---

### 1.2 Mock/테스트 코드 (필수 삭제)
```
src/lib/utils/kiosk.ts
```
**사유:**
- 전체 파일이 테스트용 mock 함수 (`mockAnalysis`, `mockVerifyCode`)
- 실제 API 연동 완료로 더 이상 사용하지 않음
- 31줄의 불필요한 코드

**확인 방법:**
```bash
# 사용 여부 확인
grep -r "mockAnalysis" src/app
grep -r "mockVerifyCode" src/app
# → src/lib/utils/kiosk.ts 파일 내부에만 존재
```

---

### 1.3 개발용 문서 (필수 삭제)
```
for_claude_design.md                              # Claude 지시사항 (21KB)
API_INTEGRATION_PLAN.md                           # 루트 (docs/와 중복)
docs/SESSION_WORK_REPORT.md                       # 작업 세션 보고서
docs/SSE_REGISTRATION_FLOW.md                     # SSE 플로우 (미구현)
docs/PROXY_IMPLEMENTATION_PLAN.md                 # 프록시 구현 계획
docs/button-feedback-explanation.md               # 버튼 피드백 설명
kiosk/                                            # 전체 폴더 (초기 개발 가이드)
```

**사유:**
- `for_claude_design.md`: AI에게 주는 지시사항, 제출용 아님
- `API_INTEGRATION_PLAN.md`: docs/ 폴더에 동일 파일 존재 (중복)
- `docs/SESSION_WORK_REPORT.md`: 개발 과정 기록 (제출 불필요)
- `docs/SSE_REGISTRATION_FLOW.md`: SSE 방식은 구현되지 않음
- `docs/PROXY_IMPLEMENTATION_PLAN.md`: 구현 계획 문서 (제출 불필요)
- `docs/button-feedback-explanation.md`: 개발 참고용 설명
- `kiosk/` 폴더: 초기 개발 가이드 (6개 파일, 총 82KB)

**총 용량:** 약 150KB의 개발용 문서

---

### 1.4 스크린샷 (선택적 삭제)
```
screens/2-1.png                                   # 88KB
screens/2-2.png                                   # 43KB
screens/2-3.png                                   # 78KB
screens/2-4.png                                   # 66KB
screens/2-error.png                               # 82KB
```

**선택 기준:**
- **유지**: README에 UI 스크린샷으로 활용 시
- **삭제**: 문서화하지 않는다면 불필요 (총 357KB)

---

### 1.5 기본 Public 파일 (선택적 삭제)
```
public/file.svg
public/globe.svg
public/next.svg
public/vercel.svg
public/window.svg
```

**사유:**
- Next.js 기본 생성 파일들
- 프로젝트에서 사용하지 않음

**선택 기준:**
- 용량이 작으므로 유지해도 무방
- 깔끔한 제출을 원한다면 삭제 권장

---

## ✏️ 2. 수정 필요 항목

### 2.1 불필요한 주석 제거

**`next.config.ts` (8번, 12번 줄)**
```typescript
// 수정 전
hostname: '**', // 모든 호스트 허용 (테스트용)

// 수정 후
hostname: '**', // 모든 호스트 허용
```

**`src/components/kiosk/ProgressTimer.tsx` (55-57번 줄)**
```typescript
// 삭제 권장: 주석 처리된 JSX 코드
{/* <p className="text-[14px] text-[#6c757d] text-center mb-2">
  {timeLeft}{message}
</p> */}
```

---

### 2.2 사용하지 않는 변수 제거

**`src/components/kiosk/ProgressTimer.tsx`**

**현재 경고:**
```
17:3  Warning: 'message' is assigned a value but never used.
21:10 Warning: 'timeLeft' is assigned a value but never used.
```

**수정 방법:**
```typescript
// 수정 전 (17번 줄)
message = '초 후 처음 화면으로 돌아갑니다',

// 수정 후 (파라미터에서 제거)
// message 파라미터 삭제

// 수정 전 (21번 줄)
const [timeLeft, setTimeLeft] = useState(duration);

// 수정 후
// timeLeft state 삭제 또는 실제 사용 추가
```

---

## 📝 3. 문서 업데이트 필요

### 3.1 README.md 전면 수정 (필수)

**현재 문제점:**
- **프로젝트 설명 불일치**: "분실물 게시판" → 실제로는 "키오스크 시스템"
- **기능 설명 불일치**: 검색, 필터, 무한 스크롤 → 실제로는 등록/수령 플로우
- **기술 스택**: React 19.1.0 → 실제로는 19.2.1
- **프로젝트 구조**: 완전히 다른 구조

**수정해야 할 섹션:**
1. 프로젝트 소개
2. 주요 기능
3. 기술 스택 (버전 업데이트)
4. 프로젝트 구조
5. 실행 방법
6. API 엔드포인트

**권장 구조:**
```markdown
# 🏢 인하대 분실물 키오스크 시스템

## 프로젝트 소개
24시간 무인 분실물 등록/수령 키오스크

## 주요 기능
### 등록 플로우
- 분실물 투입 및 자동 촬영
- AI 분류 및 정보 저장

### 수령 플로우
- 6자리 PIN 코드 입력
- 사물함 자동 개방
```

---

### 3.2 유지할 문서 정리

**유지 권장 문서:**
```
docs/API_INTEGRATION_PLAN.md          # API 연동 명세
docs/KIOSK_API_SPEC.md                # 키오스크 API 스펙
docs/KIOSK_DEVELOPMENT_GUIDE.md       # 개발 가이드
openapi.json                          # OpenAPI 명세
```

**삭제 권장 문서:**
```
docs/ui-design-spec.txt               # Figma 디자인 스펙 (선택적)
```

---

## 🔍 4. 코드 품질 개선 (선택사항)

### 4.1 ESLint 경고 해결

**현재 경고:**
```
src/components/kiosk/ProgressTimer.tsx:
  17:3  Warning: 'message' is assigned a value but never used.
  21:10 Warning: 'timeLeft' is assigned a value but never used.

src/lib/api/kiosk.ts:
  66:12 Warning: 'error' is defined but never used.
```

**권장 조치:**
- ProgressTimer: 사용하지 않는 변수 제거
- kiosk.ts: catch 블록의 error 변수 사용 또는 `_error`로 변경

---

### 4.2 TypeScript strict 모드 확인

**확인 사항:**
```bash
# tsconfig.json에서 확인
grep "strict" tsconfig.json
```

---

## 📊 5. 정리 후 예상 효과

### 파일 삭제
- **컴포넌트**: 2개 파일 (InsertScreen, ConfirmScreen)
- **Utils**: 1개 파일 (kiosk.ts mock)
- **문서**: 8개 파일 + kiosk 폴더 전체
- **총 예상 감소**: 약 200KB + 코드 200줄 이상

### 코드 품질
- ESLint 경고 해결
- 불필요한 주석 제거
- 사용하지 않는 변수 제거

### 문서화
- README.md 실제 프로젝트와 일치
- 필요한 문서만 유지

---

## ✅ 6. 실행 체크리스트

### 필수 작업
- [ ] InsertScreen.tsx 삭제
- [ ] ConfirmScreen.tsx 삭제
- [ ] src/lib/utils/kiosk.ts 삭제
- [ ] for_claude_design.md 삭제
- [ ] API_INTEGRATION_PLAN.md (루트) 삭제
- [ ] docs/SESSION_WORK_REPORT.md 삭제
- [ ] docs/SSE_REGISTRATION_FLOW.md 삭제
- [ ] docs/PROXY_IMPLEMENTATION_PLAN.md 삭제
- [ ] docs/button-feedback-explanation.md 삭제
- [ ] kiosk/ 폴더 전체 삭제
- [ ] README.md 전면 수정
- [ ] next.config.ts 주석 수정
- [ ] ProgressTimer.tsx 주석 처리된 코드 삭제
- [ ] ProgressTimer.tsx 사용하지 않는 변수 제거

### 선택 작업
- [ ] screens/ 폴더 삭제 (또는 README에 활용)
- [ ] public/ 기본 SVG 파일 삭제
- [ ] kiosk.ts ESLint 경고 해결

### 최종 확인
- [ ] 빌드 성공 확인 (`npm run build`)
- [ ] ESLint 에러 0개 확인
- [ ] 로컬 실행 테스트 (`npm run dev`)
- [ ] 등록 플로우 테스트
- [ ] 수령 플로우 테스트

---

## 🎯 7. 권장 작업 순서

1. **백업**: 현재 상태 git commit
2. **파일 삭제**: 안쓰는 컴포넌트, mock 코드, 개발 문서
3. **코드 수정**: 주석, 사용하지 않는 변수
4. **문서 업데이트**: README.md 전면 수정
5. **테스트**: 빌드 및 실행 확인
6. **커밋**: "chore: 제출용 레포지토리 정리"

---

## 📌 참고사항

- **Git History**: 개발 과정은 git history에 모두 보존됨
- **문서 백업**: 삭제 전 docs-archive/ 폴더로 이동 고려
- **점진적 삭제**: 한 번에 모두 삭제하지 말고 단계별 확인
- **빌드 확인**: 각 단계마다 `npm run build` 실행하여 오류 확인

---

## 💡 추가 제안

### 제출용 추가 작업
1. **CHANGELOG.md** 작성 (주요 기능 변경 이력)
2. **LICENSE** 파일 추가 (MIT 등)
3. **.gitignore** 검토 (.env 등 민감 정보 제외 확인)
4. **package.json** 프로젝트 정보 업데이트 (name, description, repository)

### 발표 자료 준비
1. **screens/** 활용: UI 스크린샷을 발표 자료로 활용
2. **API 명세**: openapi.json 기반 API 문서화
3. **아키텍처 다이어그램**: 등록/수령 플로우 다이어그램

---

**작성자**: Claude Code
**검토 필요**: README.md 업데이트 내용, 삭제할 문서 범위
