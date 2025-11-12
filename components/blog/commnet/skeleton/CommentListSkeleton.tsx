function CommentListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex w-full gap-2 border-red-500">
        <div className="h-[50px] basis-[50px] animate-pulse rounded bg-neutral-300" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-[30%] animate-pulse rounded bg-neutral-300" />
          <div className="h-8 animate-pulse rounded bg-neutral-300" />
        </div>
      </div>
      <div className="flex w-full gap-2 border-red-500">
        <div className="h-[50px] basis-[50px] animate-pulse rounded bg-neutral-300" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-[30%] animate-pulse rounded bg-neutral-300" />
          <div className="h-8 animate-pulse rounded bg-neutral-300" />
        </div>
      </div>
    </div>
  );
}

export default CommentListSkeleton;
