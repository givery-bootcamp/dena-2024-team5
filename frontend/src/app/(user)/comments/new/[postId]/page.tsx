import { CommentForm } from "@/components/CommentForm";
import { cookies } from "next/headers";

export default function Home({ params }: { params: { postId: string } }) {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  return (
    <div className="grid gap-4">
      <h1 className="text-4xl">コメント</h1>
      <CommentForm jwtToken={jwtToken} postId={Number(params.postId)} />
    </div>
  );
}
