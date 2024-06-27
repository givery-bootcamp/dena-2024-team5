"use client";
import { Button } from "@/components/ui/button";
import { addLike } from "@/utils/addLike";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

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
  const { toast } = useToast();
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
            toast({
              description: "♥いいねしました！",
            });
          } catch (error) {
            toast({
              description: "すでにいいね済みかも？",
            });
            return;
          }
        } else {
          toast({
            description: "♥いいね済みです！",
          });
        }
      }}
    >
      <div>
        <i className="ml-[2px] nes-icon heart items-center" />
        <span>{numLikes}</span>
      </div>
    </Button>
  );
};
