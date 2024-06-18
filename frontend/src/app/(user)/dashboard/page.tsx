import { auth } from "@/auth";
import PostedItem from "@/components/PostedItem";
import { aspidaClient } from "@/lib/aspidaClient";
import { redirect } from "next/navigation";

export default async function Home() {
  const postedItems = await aspidaClient.posts.$get();
  const session = await auth();
  console.log(session);
  if (!session) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      {postedItems.map((data) => (
        <PostedItem key={data.id} postedItem={data} />
      ))}
    </div>
  );
}
