"use client";
import { Button } from "@/components/ui/button";
import { addLike } from "@/utils/addLike";
import { useState } from "react";
import { toast } from "sonner";

type LikeButtonProps = {
  postId: number;
  likeCount: number;
  jwtToken: string;
};

export const LikeButton = ({
  postId,
  likeCount,
  jwtToken,
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likeCount);
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={async () => {
        if (!isLiked) {
          try {
            await addLike({ postId, jwtToken });
            setIsLiked((prev) => !prev);
            setNumLikes((prev) => prev + 1);
            toast("♥いいねしました！");
          } catch (error) {
            toast.error("すでにいいね済みかも？");
            return;
          }
        } else {
          toast.error("すでにいいね済みかも？");
        }
      }}
    >
      <div>
        <i className="ml-[2px] nes-icon heart items-center" />
        <span className="font-extrabold">{numLikes}</span>
      </div>
    </Button>
  );
};
