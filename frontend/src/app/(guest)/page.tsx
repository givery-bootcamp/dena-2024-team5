import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4">
        <p>未ログイン</p>
      </div>
    </div>
  );
}
