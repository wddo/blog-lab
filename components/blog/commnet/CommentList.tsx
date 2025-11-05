import { getComments } from "@/app/blog/actions";

interface ICommnetProps {
  postId: string;
}

interface IComment {
  id: string;
  author: string;
  content: string;
  created_at?: string;
}

async function CommentList({ postId }: ICommnetProps) {
  const comments = (await getComments(postId)) as IComment[];

  if (!comments || comments.length === 0) {
    return <div className="text-sm text-neutral-500">댓글이 없습니다.</div>;
  }

  return (
    <ul className="space-y-4">
      {comments.map((c) => (
        <li key={c.id} className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200">
            <span className="text-[10px] text-neutral-600">
              {c.author[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 rounded-md">
            <div className="mb-1 text-xs text-neutral-500">{c.author}</div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {c.content}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
