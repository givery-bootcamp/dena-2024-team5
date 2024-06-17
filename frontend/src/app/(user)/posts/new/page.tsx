import { PostForm } from "@/components/PostForm";

export default function Home() {
  return (
    <div className="grid gap-4">
      <h1 className="text-4xl">新規投稿</h1>
      <PostForm />
    </div>
  );
}
