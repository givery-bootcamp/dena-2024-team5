"use client";
import { isEditModeAtom } from "@/lib/atom";
import { editPostFormSchema } from "@/lib/zod";
import { dateFormatString2DateJa } from "@/utils/date";
import { editPost } from "@/utils/editPost";
import { useAtom } from "jotai";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Entity_Post } from "../../api/@types";
import { PostEditButton, PostEditCancelButton } from "./Buttons";
import { PostDeleteDialog } from "./deletePostDialog";
import AutoForm from "./ui/auto-form";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type PostDetailProps = {
  postItem: Entity_Post;
  jwtToken: string;
};

export const PostDetail = ({ postItem, jwtToken }: PostDetailProps) => {
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const router = useRouter();
  const { toast } = useToast();
  if (isEditMode) {
    return (
      <div className="flex-1 grid gap-4">
        <div className="text-right">
          <p>
            投稿者:
            {postItem.username}
          </p>
          <p>
            投稿日時:
            {dateFormatString2DateJa(postItem.created_at)}
          </p>
          <p>
            更新日時:
            {dateFormatString2DateJa(postItem.updated_at)}
          </p>
        </div>
        <div className="border-b px-4" />
        <AutoForm
          formSchema={editPostFormSchema}
          onSubmit={async (data) => {
            try {
              await editPost({ postId: postItem.id, jwtToken, editData: data });
              setIsEditMode(false);
              router.push(`/posts/${postItem.id}`);
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
          }}
          fieldConfig={{
            title: {
              inputProps: {
                type: "text",
                defaultValue: postItem.title,
                className: "font-bold w-full",
              },
            },
            body: {
              fieldType: "textarea",
              inputProps: {
                defaultValue: postItem.body,
                className: "h-96 w-full",
              },
            },
          }}
        >
          <div className="flex justify-end gap-4">
            <PostEditCancelButton />
            <Button type="submit">
              <Pen className="mr-2 w-4 h-4" />
              変更を保存
            </Button>
          </div>
        </AutoForm>
      </div>
    );
  }
  return (
    <div className="flex-1 grid gap-4">
      <h1 className="text-4xl font-bold">{postItem.title}</h1>
      <div className="text-right">
        <p>
          投稿者:
          {postItem.username}
        </p>
        <p>
          投稿日時:
          {dateFormatString2DateJa(postItem.created_at)}
        </p>
        <p>
          更新日時:
          {dateFormatString2DateJa(postItem.updated_at)}
        </p>
      </div>
      <div className="border-b px-4" />
      <p className="whitespace-break-spaces min-h-96">{postItem.body}</p>
      <div className="flex justify-end gap-4">
        <PostEditButton />
        <PostDeleteDialog postId={postItem.id} jwtToken={jwtToken} />
      </div>
    </div>
  );
};
