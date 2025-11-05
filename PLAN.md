# Product Lab - plan

## 목표

**Next.js App Router를 사용한 상품 목록과 상세 페이지 구현**

- 서버 컴포넌트로 첫 페이지 SSR 렌더링
- 클라이언트 컴포넌트로 무한 스크롤
- 상세에서 히스토리 백 시 캐싱된 데이터로 즉시 렌더링

## 코드 컨벤션

### 주석 규칙

**JSDoc 주석**

- 파일 상단의 전체 설명
- 클래스, 함수, 메서드의 공개 API 문서화
- export되는 상수나 객체의 전체 설명
- 컴포넌트의 props 타입 정의

**인라인 주석 (`//`)**

- 객체 내부의 개별 속성 설명
- 코드 블록 내부의 세부 설명
- 변수나 상수의 간단한 설명
- 로직의 단계별 설명

### 인터페이스 규칙

**컴포넌트 Props**

- `I` 프리픽스 + 컴포넌트명 + `Props` 접미사
- 예: `SearchProps`, `ProductListProps`, `ProductItemProps`

**그 외 데이터 모델**

- `I` 프리픽스 + 모델명
- 예: `IProduct`, `IProductDetail`, `IUser`

### 함수 네이밍 규칙

**내부 핸들러 (컴포넌트 내부에서 정의)**

- `handle + 동작`: `handleClick`, `handleSubmit`
- `handle + 대상 + 동작`: `handleBtnClick`, `handleModalClose`

**외부 콜백 (props로 전달받는 함수)**

- `on + 동작`: `onClick`, `onSubmit`
- `on + 대상 + 동작`: `onOpenChange`, `onModalVisibilityChange`

### 함수 작성 규칙

- 함수를 먼저 선언하고, 마지막에 `export default`

```tsx
function MyComponent() {
  return <div>Hello</div>;
}

export default MyComponent;
```

### 예시

```tsx
// 내부 핸들러
<button onClick={handleClick} />
<input onChange={handleInputChange} />

// 외부 콜백
<Modal onOpenChange={handleOpenChange} />
<Dialog onVisibilityChange={handleVisibilityChange} />
```

## 코드 작성 컨셉

- 불필요한 옵션 최소화
- 소스는 간소하게
- 테스트는 vitest를 사용
