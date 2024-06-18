// "use client";
import { auth } from "@/auth";
import PostedItem from "@/components/PostedItem";
import { aspidaClient } from "@/lib/aspidaClient";
import { redirect } from "next/navigation";

export default async function Home() {
  const listData = await aspidaClient.posts.$get();
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      {listData.map((data) => (
        <PostedItem key={data.id} postedItem={data} />
      ))}
    </div>
  );
}
