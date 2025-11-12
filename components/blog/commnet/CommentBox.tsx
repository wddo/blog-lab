import CommentTextArea from "@/components/blog/_internal/CommentTextArea";
import SubmitButton from "@/components/blog/_internal/SubmitButton";
import { insertComment } from "@/lib/blog/actions";

interface CommentBoxProps {
  postId: string;
}

async function CommentBox({ postId }: CommentBoxProps) {
  return (
    <form
      className="mb-6 rounded-lg border border-neutral-200 p-4"
      action={insertComment.bind(null, postId)}
      key={postId}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200">
          <span className="text-xs text-neutral-600">T</span>
        </div>
        <div className="flex-1">
          <div className="mb-1 text-xs text-neutral-500">tester</div>
          <div className="flex-1">
            <CommentTextArea />
            <div className="mt-3 flex justify-end">
              <SubmitButton />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentBox;
