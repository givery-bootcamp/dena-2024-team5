import { CommentEditButton } from "@/components/Buttons";
import { CommentDeleteDialog } from "@/components/deleteCommentDialog";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import type { Entity_Comment } from "../../../../api/@types";

type PanelProps = {
  comment: Entity_Comment;
  imgPath: string;
  jwtToken: string;
  meId: number;
};
export default function RandomwalkCharacterWithComment({
  comment,
  imgPath,
  jwtToken,
  meId,
}: PanelProps) {
  gsap.registerPlugin(useGSAP);
  const boxRef = useRef(null);

  useGSAP(() => {
    // アニメーションの設定
    gsap.to(boxRef.current, {
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 600,
      duration: Math.max(Math.random() * 2, 1),
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="flex" ref={boxRef}>
      <Image src={imgPath} alt="character" width={100} height={100} />
      <div className="nes-balloon from-left flex gap-2">
        {comment.body}
        {comment.user_id === meId && (
          <div className="grid grid-cols-2 gap-x-2 justify-end">
            <CommentEditButton commentId={comment.id} />
            <CommentDeleteDialog commentId={comment.id} jwtToken={jwtToken} />
          </div>
        )}
      </div>
    </div>
  );
}
