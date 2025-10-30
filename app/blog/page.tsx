import BlogList from "@/components/blog/BlogList";

export default function BlogPage() {
  const demo = [
    {
      id: "1",
      title: "블로그 포스트",
      imageUrl: [
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1761671263820-d7787364c6e9?q=80&w=1600&auto=format&fit=crop",
      ],

      content:
        "이곳에 포스트의 본문이 들어갑니다. 예시로 길이를 늘려 실제 사용 상황과 비슷하게 보이도록 구성했습니다.\n\n문단은 여러 문장으로 이뤄져 가독성을 높이고, 모바일과 데스크톱 환경 모두에서 적절한 줄바꿈과 여백으로 읽기 편한 레이아웃을 제공합니다.\n\n이미지와 함께 배치되며, 사용자는 좋아요와 공유 기능을 통해 손쉽게 상호작용할 수 있습니다.",
      comments: [
        {
          id: "c1",
          author: "mason",
          content:
            "좋은 글 감사합니다!\n\n특히 본문에서 사례를 들어 설명한 부분이 이해에 큰 도움이 되었어요. 정리된 구조 덕분에 필요한 내용을 빠르게 파악할 수 있었습니다.",
        },
        {
          id: "c2",
          author: "jane",
          content:
            "이미지가 멋지네요.\n촬영 정보나 사용 장비 같은 메타 정보도 있으면 더 좋을 것 같아요. 다음 글도 기대하겠습니다!",
        },
      ],
    },
    {
      id: "2",
      title: "이미지 없는 포스트",
      content:
        "이미지가 없는 포스트 예시입니다. 텍스트만으로도 레이아웃이 단조롭지 않도록 제목, 본문, 인터랙션 영역(좋아요/공유), 댓글 입력과 목록이 순서대로 나타납니다.\n\n실제 데이터 연결 시에는 서버에서 받아온 콘텐츠 길이에 상관없이 안정적으로 렌더링되도록 설계되었습니다.",
      comments: [
        {
          id: "c3",
          author: "john",
          content:
            "실용적인 구성 좋아요.\n\n이미지 없이도 본문, 인터랙션 영역, 댓글 섹션이 명확히 구분되어 있고, 타이포와 여백이 안정적이라 읽기 편합니다.",
        },
      ],
    },
  ];

  return (
    <main className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Blog</h1>
        <BlogList items={demo} />
      </div>
    </main>
  );
}
