# Blog Lab - Tasks

## 목표

**Next.js App Router를 사용한 블로그 플랫폼 구현**

- 서버 컴포넌트로 첫 페이지 SSR 렌더링
- Server Actions를 활용한 데이터 변경
- Next.js 캐싱 전략을 통한 성능 최적화
- 이미지 업로드 및 관리 기능

## 폴더 구조

```
blog-lab/
├── app/                      # Next.js App Router
│   ├── blog/                 # 블로그 페이지
│   │   ├── edit/[id]/        # 게시글 수정 페이지
│   │   ├── write/            # 게시글 작성 페이지
│   │   └── page.tsx          # 블로그 목록 페이지
│   ├── login/                # 로그인 페이지
│   ├── signup/               # 회원가입 페이지
│   ├── layout.tsx            # 루트 레이아웃
│   ├── loading.tsx           # 로딩 UI
│   └── error.tsx             # 에러 UI
├── components/               # React 컴포넌트
│   ├── blog/                 # 블로그 관련 컴포넌트
│   │   ├── _internal/        # 내부 사용 컴포넌트
│   │   ├── commnet/          # 댓글 관련 컴포넌트
│   │   ├── image/            # 이미지 관련 컴포넌트
│   │   ├── BlogItem.tsx      # 게시글 아이템
│   │   ├── BlogList.tsx      # 게시글 목록
│   │   └── EditForm.tsx      # 게시글 편집 폼
│   ├── layout/               # 레이아웃 컴포넌트
│   └── ui/                   # 재사용 UI 컴포넌트
├── lib/                      # 비즈니스 로직
│   ├── auth/                 # 인증 관련 Server Actions
│   └── blog/                 # 블로그 관련 Server Actions
├── hooks/                    # 커스텀 훅
├── providers/                # Context Provider
├── utils/                    # 유틸리티 함수
│   └── supabase/             # Supabase 클라이언트
├── types/                    # TypeScript 타입 정의
├── data/                     # 상수 및 정적 데이터
└── public/                   # 정적 파일
```

## 작업 목록

- [x] 블로그 레이아웃 작성
- [x] Supabase 연결 및 Storage 설정
- [x] 블로그 DB 스키마 작성
- [x] 인증 기능 구현 (로그인/회원가입)
- [x] 댓글 CRUD Server Actions 구현
- [x] 게시글 CRUD Server Actions 구현
- [x] 댓글 UI 구현
- [x] 게시글 UI 구현
- [x] 이미지 업로드 기능 구현
- [x] revalidatePath를 통한 캐시 무효화
- [x] revalidateTag를 통한 특정 캐시 무효화
