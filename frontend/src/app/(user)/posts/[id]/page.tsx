import { aspidaClient } from "@/lib/aspidaClient";

export default async function Home({ params }: { params: { id: string } }) {
  const postedData = await aspidaClient.post._postId(Number(params.id)).$get();

  return (
    <div>
      投稿詳細画面<div>{params.id}</div>
    </div>
  );
}
