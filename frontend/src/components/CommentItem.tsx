"use client";

import { isCommentEditModeAtom } from "@/lib/atom";
import { editCommentFormSchema } from "@/lib/zod";
import { editComment } from "@/utils/editComment";
import userId2ImagePath from "@/utils/userId2Image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { Entity_Comment } from "../../api/@types";
import { CommentEditButton } from "./Buttons";
import { CommentEditCancelButton } from "./Buttons";
import RandomwalkCharacterWithComment from "./dots/organism/RandomWalkCharacterWithComment";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import ImgWithLeft2RightMotion from "./dots/atom/imgWithLeft2Right";
import { CommentDeleteDialog } from "./deleteCommentDialog";

type CommentDetailProps = {
  commentEntity: Entity_Comment;
  jwtToken: string;
};

type onSubmitType = z.infer<typeof editCommentFormSchema>;

export function CommentItem({
  comment,
  jwtToken,
  meId,
}: {
  comment: Entity_Comment;
  jwtToken: string;
  meId: number;
}) {
  const [isEditMode] = useAtom(isCommentEditModeAtom(comment.id));

  if (isEditMode) {
    return <CommentEditForm commentEntity={comment} jwtToken={jwtToken} />;
  }

  return (
    <RandomwalkCharacterWithComment
      comment={comment}
      jwtToken={jwtToken}
      imgPath={userId2ImagePath(comment.user_id, meId)}
    />
    // <div className="flex justify-center">
    // <ImgWithLeft2RightMotion
    //   imgPath={userId2ImagePath(comment.user_id, meId)}
    // />
    //   <div className="nes-balloon from-left ">
    //     {comment.body}
    //     <div className="absolute bottom-0 right-0 flex">
    //       <CommentEditButton commentId={comment.id} />
    //       <CommentDeleteDialog commentId={comment.id} jwtToken={jwtToken} />
    //     </div>
    //   </div>
    // </div>
  );
}

const CommentEditForm = ({ commentEntity, jwtToken }: CommentDetailProps) => {
  const [, setIsEditMode] = useAtom(isCommentEditModeAtom(commentEntity.id));
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editCommentFormSchema),
    defaultValues: {
      body: commentEntity.body,
    },
  });
  const onSubmit = async (data: onSubmitType) => {
    try {
      await editComment({ id: commentEntity.id, jwtToken, editData: data });
      setIsEditMode(false);
      router.push(`/posts/${commentEntity.post_id}`);
      toast({
        description: "編集に成功しました!📝",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "編集に失敗しました...😭",
      });
    }
  };

  return (
    <form className="flex-1 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid whitespace-break-spaces min-h-24">
        <Textarea {...register("body")} className="min-h-16" />
      </div>
      {errors.body && (
        <p className="text-red-500 text-sm">{errors.body.message}</p>
      )}
      <div className="flex justify-end gap-4">
        <CommentEditCancelButton commentId={commentEntity.id} />
        <Button variant="nesPrimary" type="submit">
          <Pen className="mr-2 w-4 h-4" />
          変更を保存
        </Button>
      </div>
    </form>
  );
};
