import PostedItem from "@/components/PostedItem";
// import { aspidaClient } from "@/lib/aspidaClient";
import { Entities_Post } from "../../../api/@types";

export default async function Home() {
  // const listData = await aspidaClient.posts.$get();
  const listData:Entities_Post[] = []

  return (
    <div className="grid grid-cols-1 gap-4">
      {listData.map((data) => (
        <PostedItem key={data.id} postedItem={data} />
      ))}
    </div>
  );
}
