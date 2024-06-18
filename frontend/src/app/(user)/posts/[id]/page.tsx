import { aspidaClient } from "@/lib/aspidaClient";

export default async function Home({ params }: { params: { id: string } }) {
  const postedItemsDetail = await aspidaClient.posts
    ._postID(Number(params.id))
    .$get();
  return (
    <div>
      投稿詳細画面<div>{postedItemsDetail.id}</div>
    </div>
  );
}
