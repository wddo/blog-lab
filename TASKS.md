# Blog Lab - Tasks

## 목표

**Next.js App Router를 사용한 상품 목록과 상세 페이지 구현**

- 서버 컴포넌트로 첫 페이지 SSR 렌더링
- 클라이언트 컴포넌트로 무한 스크롤
- 상세에서 히스토리 백 시 캐싱된 데이터로 즉시 렌더링

## 폴더 구조

```
blog-lab/
├── app/                  # Next.js App Router
│   ├── api/              # API 라우트
│   ├── blog/             # 블로그 페이지
│   └── layout.tsx        # 루트 레이아웃
├── components/           # React 컴포넌트
│   ├── blog/             # 블로그 관련 컴포넌트
│   └── ui/               # 재사용 UI 컴포넌트
├── hooks/                # 커스텀 훅
├── client-api/           # API 호출 함수
├── data/                 # 상수 및 정적 데이터
└── public/               # 정적 파일
```

## 작업 목록

- [x] 블로그 레이아웃 작성
- [x] vercel storage 연결
- [x] 블로그 페이지에 데이터 fetching 연결
- [x] 댓글 작성 폼 핸들러 연결
- [x] revalidateTag 통해 캐시 즉시 무효화 확인
- [ ] 댓글 CRUD API 구현
- [ ] 글 CRUD API 구현
- [ ] cacheTag 이용한 댓글 stale 정책 적용
- [ ] next/fetch 의 cache 속성을 이용해 최신성 중요도가 떨어지는 조회수 캐싱
