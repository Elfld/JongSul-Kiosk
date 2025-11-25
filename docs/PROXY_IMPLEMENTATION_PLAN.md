# API 프록시 구현 계획

## 개요

현재 프론트엔드에서 백엔드 API를 직접 호출하고 있어 다음 문제가 발생할 수 있습니다:
- API URL이 클라이언트에 노출됨
- CORS 설정이 복잡해짐
- API 키 등 민감 정보를 클라이언트에서 관리해야 함

**해결책:** Next.js API Routes를 프록시로 사용하여 서버에서 백엔드 API 호출

---

## 현재 구조 vs 프록시 구조

### 현재 (Direct Call)

```
Browser → AWS API Gateway (직접)
  ↓
https://skubr5x2p0.execute-api.us-west-2.amazonaws.com/main/kiosk/pickup

문제점:
- API URL이 브라우저에 노출
- CORS 설정 필요
- NEXT_PUBLIC_API_BASE_URL 환경변수 필요 (클라이언트 노출)
```

### 프록시 구조 (API Route)

```
Browser → Next.js Server → AWS API Gateway
  ↓           ↓
/api/kiosk/pickup → AWS 실제 API

장점:
- API URL이 서버에만 존재 (API_BASE_URL, 노출 안 됨)
- CORS 불필요 (같은 도메인)
- API 키 등 서버에서 안전하게 관리 가능
```

---

## 구현 방법

### 1. Next.js Rewrites (권장)

**장점:** 설정만으로 간단하게 프록시 구현

**next.config.js**
```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/kiosk/:path*',
        destination: `${process.env.API_BASE_URL}/main/kiosk/:path*`
      }
    ];
  }
};
```

**환경변수 (.env)**
```bash
# 서버 전용 (클라이언트에 노출 안 됨)
API_BASE_URL=https://skubr5x2p0.execute-api.us-west-2.amazonaws.com
```

**클라이언트 코드 (kiosk.ts)**
```ts
// 변경 전
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const url = `${API_BASE_URL}/main${endpoint}`;

// 변경 후
const url = `/api${endpoint}`; // 상대 경로로 요청
```

---

### 2. API Route 직접 구현 (대안)

프록시 로직을 직접 구현하는 방식

**src/app/api/kiosk/[...path]/route.ts**
```ts
import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL;

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const body = await request.json();

  const response = await fetch(`${API_BASE}/main/kiosk/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
```

---

## 구현 순서

### Phase 1: Rewrites 설정

1. `next.config.js`에 rewrites 추가
2. `.env` 파일 수정 (`NEXT_PUBLIC_API_BASE_URL` → `API_BASE_URL`)
3. `src/lib/api/kiosk.ts` 수정
   ```ts
   // AS-IS
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
   const API_PREFIX = '/main';
   const url = `${API_BASE_URL}${API_PREFIX}${endpoint}`;

   // TO-BE
   const url = `/api${endpoint}`; // 상대 경로
   ```

### Phase 2: 테스트

1. 로컬 개발 환경 테스트
2. Vercel 배포 후 환경변수 설정
3. 전체 플로우 테스트

### Phase 3: 클린업

1. `NEXT_PUBLIC_API_BASE_URL` 환경변수 제거
2. 문서 업데이트

---

## 환경변수 변경사항

| 구분 | 이전 | 이후 |
|------|------|------|
| **로컬 (.env.local)** | `NEXT_PUBLIC_API_BASE_URL=...` | `API_BASE_URL=...` |
| **Vercel** | `NEXT_PUBLIC_API_BASE_URL=...` | `API_BASE_URL=...` |
| **노출 여부** | 클라이언트 노출됨 | 서버 전용 (노출 안 됨) |

---

## Rewrites vs API Route 비교

| 항목 | Rewrites | API Route |
|------|----------|-----------|
| 구현 난이도 | ⭐ 쉬움 | ⭐⭐ 보통 |
| 유지보수 | 설정만 관리 | 코드 관리 필요 |
| 커스터마이징 | 제한적 | 자유로움 |
| 헤더/인증 추가 | 불가능 | 가능 |
| 권장 사용 | 단순 프록시 | 복잡한 로직 필요 시 |

**현재 상황:** 단순 프록시면 충분 → **Rewrites 권장**

---

## 장애 대응

### CORS 에러 발생 시

**원인:** Rewrites가 제대로 동작하지 않음

**해결:**
1. `next.config.js`의 rewrites 문법 확인
2. 서버 재시작 (`npm run dev` 재실행)
3. 브라우저 캐시 삭제

### API 요청이 404 발생 시

**원인:** 경로 매칭 문제

**해결:**
```js
// AS-IS
source: '/api/kiosk/:path*'

// TO-BE (와일드카드 수정)
source: '/api/kiosk/:path(.*)'
```

---

## 참고자료

- [Next.js Rewrites 공식 문서](https://nextjs.org/docs/api-reference/next.config.js/rewrites)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
