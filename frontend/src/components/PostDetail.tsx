"use client";
import { isEditModeAtom } from "@/lib/atom";
import { postFormSchema } from "@/lib/zod";
import { dateFormatString2DateJa } from "@/utils/date";
import { editPost } from "@/utils/editPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import type { Entity_Post } from "../../api/@types";
import { PostEditButton, PostEditCancelButton } from "./Buttons";
import { LikeButton } from "./LikeButton";
import { PostDeleteDialog } from "./deletePostDialog";
import ImgWithJumpMotion from "./dots/atom/imgWithJumpMotion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type PostDetailProps = {
  postItem: Entity_Post;
  jwtToken: string;
  imgPath: string;
  meId: number;
};

type onSubmitType = z.infer<typeof postFormSchema>;

export const PostDetail = ({
  postItem,
  jwtToken,
  imgPath,
  meId,
}: PostDetailProps) => {
  const [isEditMode] = useAtom(isEditModeAtom);

  if (isEditMode) {
    return (
      <PostEditForm
        postItem={postItem}
        jwtToken={jwtToken}
        imgPath={imgPath}
        meId={meId}
      />
    );
  }
  return (
    <div className="flex-1 grid gap-4">
      <div>
        <center className="flex justify-center">
          <ImgWithJumpMotion imgPath={imgPath} />
          <div className="flex items-center">
            <div className="text-6xl">{postItem.username}</div>
            <LikeButton
              postId={postItem.id}
              likeCount={postItem.like_count}
              jwtToken={jwtToken}
            />
          </div>
        </center>
        <div className="grid items-end">
          <div className="nes-container is-dark">{postItem.title}</div>
        </div>
      </div>
      <div className="whitespace-break-spaces min-h-32 nes-container is-dark">
        {postItem.body}
        {meId === postItem.user_id && (
          <div className="absolute bottom-0 right-0 flex">
            <PostEditButton />
            <PostDeleteDialog postId={postItem.id} jwtToken={jwtToken} />
          </div>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <p>
          投稿:
          {dateFormatString2DateJa(postItem.created_at)}
        </p>
        <p>
          更新:
          {dateFormatString2DateJa(postItem.updated_at)}
        </p>
      </div>
    </div>
  );
};

const PostEditForm = ({ postItem, jwtToken, imgPath }: PostDetailProps) => {
  const [, setIsEditMode] = useAtom(isEditModeAtom);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: postItem.title,
      body: postItem.body,
    },
  });
  const onSubmit = async (data: onSubmitType) => {
    try {
      await editPost({ postId: postItem.id, jwtToken, editData: data });
      setIsEditMode(false);
      router.push(`/posts/${postItem.id}`);
      toast.success("編集に成功しました!📝");
    } catch (error) {
      console.error(error);
      toast.error("編集に失敗しました...😭");
    }
  };

  return (
    <form className="flex-1 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <center className="flex justify-center">
        <ImgWithJumpMotion imgPath={imgPath} />
        <div className="flex items-center">
          <div className="text-6xl">{postItem.username}</div>
          <LikeButton
            postId={postItem.id}
            likeCount={postItem.like_count}
            jwtToken={jwtToken}
          />
        </div>
      </center>
      <div className="grid items-end">
        <div className="nes-container is-dark">
          <Input {...register("title")} className="nes-input is-dark" />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
      </div>
      <div className="grid whitespace-break-spaces min-h-32 nes-container is-dark">
        <Textarea
          {...register("body")}
          className="min-h-24 nes-textarea is-dark"
        />
        {errors.body && (
          <p className="text-red-500 text-sm">{errors.body.message}</p>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <PostEditCancelButton />
        <Button variant="nesPrimary" type="submit">
          <Pen className="mr-2 w-4 h-4" />
          変更を保存
        </Button>
      </div>
    </form>
  );
};
