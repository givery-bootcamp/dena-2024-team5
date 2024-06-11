import PostedItem from "@/components/PostedItem";
import { aspidaClient } from "@/lib/aspidaClient";
import type { PostedItemType } from "@/types/PostedItemType";

export default async function Home() {
  const listData = await aspidaClient.posts.$get();

  // 日付をData型にする
  const formattedListData: PostedItemType[] = listData.map(
    (data: PostedItemType) => {
      data.created_at = new Date(data.created_at);
      data.updated_at = new Date(data.updated_at);
      return data;
    },
  );
  return (
    <main className="flex min-h-screen bg-background">
      <div className="container relative my-4">
        <div className="grid grid-cols-1 gap-4">
          {formattedListData.map((data) => (
            <PostedItem key={data.id} postedItem={data} />
          ))}
        </div>
      </div>
    </main>
  );
}
