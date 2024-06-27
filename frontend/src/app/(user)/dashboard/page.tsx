import { auth } from "@/auth";
import { SignInSignOutButton } from "@/components/Buttons";
import { PostForm } from "@/components/PostForm";
import PostedItem from "@/components/PostedItem";
import { aspidaClient } from "@/lib/aspidaClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  try {
    const postedItems = await aspidaClient(jwtToken).posts.$get();
    return (
      <div className="flex flex-col gap-4 p-4 container">
        <div className="grid grid-cols-1 gap-4">
          {postedItems.map((data) => (
            <PostedItem key={data.id} postedItem={data} jwtToken={jwtToken} />
          ))}
        </div>
        <div className="flex justify-center">
          <div className="flex-1 nes-container bg-white max-w-4xl">
            <PostForm jwtToken={jwtToken} />
          </div>
          <SignInSignOutButton session={session} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex-1 justify-center container gap-4">
        <div className="nes-container is-dark with-title">
          <p className="title">Error</p>
          <p>データ取得に失敗しました…</p>
        </div>
        <SignInSignOutButton session={session} />
      </div>
    );
  }
}
