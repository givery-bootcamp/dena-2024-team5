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
};
export default function RandomwalkCharacterWithComment({
  comment,
  imgPath,
  jwtToken,
}: PanelProps) {
  gsap.registerPlugin(useGSAP);
  const boxRef = useRef(null);

  useGSAP(() => {
    // アニメーションの設定
    gsap.to(boxRef.current, {
      x: (Math.random() - 0.5) * 900,
      y: (Math.random() - 0.5) * 400,
      duration: Math.max(Math.random() * 2, 1),
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="flex" ref={boxRef}>
      <Image src={imgPath} alt="character" width={100} height={100} />
      <div className="nes-balloon from-left ">
        {comment.body}
        <div className="absolute bottom-0 right-0 flex">
          {/* <p className="text-sm">
            {dateFormatString2DateJa(comment.created_at)}
          </p> */}
          <CommentEditButton commentId={comment.id} />
          <CommentDeleteDialog commentId={comment.id} jwtToken={jwtToken} />
        </div>
      </div>
    </div>
  );
}
