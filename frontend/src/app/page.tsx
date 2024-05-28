import PostedItem from "@/components/PostedItem";
import type { PostedItemType } from "@/types/PostedItemType";

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
            <div key={data.id}>
              <PostedItem postedItem={data} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
