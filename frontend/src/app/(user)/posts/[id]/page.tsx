import { CommentItem } from "@/components/CommentItem";
import { Entity_Comment } from "../../../../../api/@types";
import { aspidaClient } from "@/lib/aspidaClient";
import { cookies } from "next/headers";

export default async function Home({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  const postedItemsDetail = await aspidaClient(jwtToken)
    .posts._postID(Number(params.id))
    .$get();
  const comments:Entity_Comment[] = postedItemsDetail.comments;
  console.log(comments);
  return (
    <div>
      投稿詳細画面<div>{postedItemsDetail.id}</div>
      コメント：
      {comments.map((data) => (
        <CommentItem key={data.id} comment={data} />
      ))}
    </div>
  );
}
