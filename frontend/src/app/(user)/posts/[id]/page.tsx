import { aspidaClient } from "@/lib/aspidaClient";
import { cookies } from "next/headers";

export default async function Home({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  const postedItemsDetail = await aspidaClient(jwtToken).posts
    ._postID(Number(params.id))
    .$get();
  return (
    <div>
      投稿詳細画面<div>{postedItemsDetail.id}</div>
    </div>
  );
}
