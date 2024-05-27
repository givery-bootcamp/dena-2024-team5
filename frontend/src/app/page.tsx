import PostedItem from "@/components/PostedItem";
import type { PostedItemType } from "@/types/PostedItemType";
import Image from "next/image";

async function getData() {
  const res = await fetch("http://localhost:9000/posts");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const listData = await getData();
  // 日付をData型にする
  listData.forEach((data: PostedItemType) => {
    data.created_at = new Date(data.created_at);
    data.updated_at = new Date(data.updated_at);
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {listData.map((data) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={data.id}>
          <PostedItem postedItem={data} />
        </div>
      ))}
    </main>
  );
}
