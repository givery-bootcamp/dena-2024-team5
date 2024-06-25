import { dateFormatString2DateJa } from "@/utils/date";
import type { Entity_Post } from "../../api/@types";
import { PostEditButton } from "./Buttons";
import { PostDeleteDialog } from "./deletePostDialog";

type PostDetailProps = {
  postItem: Entity_Post;
  jwtToken: string;
};

export const PostDetail = ({ postItem, jwtToken }: PostDetailProps) => {
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
      <p className="whitespace-break-spaces">{postItem.body}</p>
      <div className="flex justify-end gap-4">
        <PostEditButton />
        <PostDeleteDialog postId={postItem.id} jwtToken={jwtToken} />
      </div>
    </div>
  );
};
