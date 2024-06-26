"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { isCommentEditModeAtom } from "@/lib/atom";
import { editCommentFormSchema } from "@/lib/zod";
import { dateFormatString2DateJa } from "@/utils/date";
import { editComment } from "@/utils/editComment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
// import { cookies } from "next/headers";
import type { Entity_Comment } from "../../api/@types";
import { CommentEditButton, CommentEditCancelButton } from "./Buttons";
import { CommentDeleteDialog } from "./deleteCommentDialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type CommentDetailProps = {
  commentEntity: Entity_Comment;
  jwtToken: string;
};

type onSubmitType = z.infer<typeof editCommentFormSchema>;

export function CommentItem({
  comment,
  jwtToken,
}: {
  comment: Entity_Comment;
  jwtToken: string;
}) {
  // const cookieStore = cookies();
  // const jwtToken = cookieStore.get("jwt")?.value ?? "";
  const [isEditMode] = useAtom(isCommentEditModeAtom);

  if (isEditMode) {
    return <CommentEditForm commentEntity={comment} jwtToken={jwtToken} />;
  }

  return (
    <Card className="w-full">
      <CardContent>
        <CardDescription className="">{comment.body}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm">{comment.user_id}</p>
        <p className="text-sm">{dateFormatString2DateJa(comment.created_at)}</p>
        <CommentEditButton />
        <CommentDeleteDialog commentId={comment.id} jwtToken={jwtToken} />
      </CardFooter>
    </Card>
  );
}

const CommentEditForm = ({ commentEntity, jwtToken }: CommentDetailProps) => {
  const [, setIsEditMode] = useAtom(isCommentEditModeAtom);
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
        <CommentEditCancelButton />
        <Button type="submit">
          <Pen className="mr-2 w-4 h-4" />
          変更を保存
        </Button>
      </div>
    </form>
  );
};
