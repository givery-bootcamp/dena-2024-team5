import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      <p>投稿一覧</p>
    </div>
  );
}
