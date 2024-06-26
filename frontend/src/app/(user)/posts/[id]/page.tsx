import { CommentPostButton } from "@/components/Buttons";
import { CommentItem } from "@/components/CommentItem";
import { PostDetail } from "@/components/PostDetail";
import { aspidaClient } from "@/lib/aspidaClient";
import { cookies } from "next/headers";
import type { Entity_Comment } from "../../../../../api/@types";

export default async function Home({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  const postedItemsDetail = await aspidaClient(jwtToken)
    .posts._postID_number(Number(params.id))
    .$get();
  const comments: Entity_Comment[] = postedItemsDetail.comments;
  return (
    <div className="flex-1 grid gap-4">
      <PostDetail postItem={postedItemsDetail} jwtToken={jwtToken} />
      <div className="border-b px-4" />
      コメントする：
      <CommentPostButton postId={postedItemsDetail.id} />
      コメント：
      {comments.map((data) => (
        <CommentItem key={data.id} comment={data} jwtToken={jwtToken} />
      ))}
    </div>
  );
}
