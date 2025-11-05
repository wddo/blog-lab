"use client";

import Icon from "@/components/ui/Icon";
import { useState } from "react";

function InteractionButtons() {
  const [liked, setLiked] = useState(false);

  return (
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
  );
}

export default InteractionButtons;


