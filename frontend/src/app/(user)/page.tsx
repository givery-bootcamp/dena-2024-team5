import PostedItem from "@/components/PostedItem";
import { aspidaClient } from "@/lib/aspidaClient";

export default async function Home() {
  const listData = await aspidaClient.posts.$get();

  return (
    <div className="grid grid-cols-1 gap-4">
      {listData.map((data) => (
        <PostedItem key={data.id} postedItem={data} />
      ))}
    </div>
  );
}
