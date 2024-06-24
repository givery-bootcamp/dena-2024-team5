import { PostForm } from "@/components/PostForm";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  return (
    <div className="grid gap-4">
      <h1 className="text-4xl">新規投稿</h1>
      <PostForm jwtToken={jwtToken} />
    </div>
  );
}
