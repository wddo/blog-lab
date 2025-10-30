"use client";
import Icon from "@/components/ui/Icon";
import Image from "next/image";
import { useState } from "react";

export interface IComment {
  id: string;
  author: string;
  content: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  imageUrl?: string[];
  content: string;
  comments?: IComment[];
}

export interface BlogItemProps {
  item: BlogPostItem;
}

export default function BlogItem({ item }: BlogItemProps) {
  const [liked, setLiked] = useState(false);
  const { title, imageUrl, content, comments = [] } = item;

  return (
    <article className="mx-auto w-full max-w-3xl rounded-lg border border-neutral-200">
      {imageUrl ? (
        <div className="space-y-4 p-4">
          {imageUrl.map((url: string) => (
            <div key={url} className="relative aspect-video w-full">
              <div className="relative h-full w-full">
                <Image
                  src={url}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold tracking-tight">{title}</h2>
        <div className="mt-5 mb-6 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>

        <div className="my-5 flex items-center gap-3">
          <button
            type="button"
            aria-label="좋아요"
            onClick={() => setLiked((v) => !v)}
          >
            <Icon
              name="heart"
              size={24}
              className={`text-pink-600`}
              solid={liked}
              title="좋아요"
            />
          </button>
          <button type="button" aria-label="공유하기">
            <Icon name="share" size={24} title="공유" />
          </button>
        </div>

        {/* 댓글 입력 */}
        <form
          className="mb-6 rounded-lg border border-neutral-200 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            // 데모 마크업: 실제 핸들러는 나중에 연결
          }}
        >
          <div className="flex items-start gap-3">
            {/* 프로필 동그라미 */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200">
              <span className="text-xs text-neutral-600">U</span>
            </div>
            <div className="flex-1">
              <textarea
                name="comment-area"
                className="w-full resize-none rounded-md border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
                rows={3}
                placeholder="댓글을 입력하세요"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
                >
                  댓글 등록
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* 댓글 리스트 */}
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
      </div>
    </article>
  );
}
