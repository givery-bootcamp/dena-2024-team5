import { auth } from "@/auth";
import { SignInSignOutButton } from "@/components/Buttons";
import { CommentItem } from "@/components/CommentItem";
import { PostDetail } from "@/components/PostDetail";
import DetailFooterLayer from "@/components/dots/organism/detail/DetailFooterLayer";
import { Button } from "@/components/ui/button";
import { aspidaClient } from "@/lib/aspidaClient";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Entity_Comment } from "../../../../../api/@types";

export default async function Home({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  try {
    const postedItemsDetail = await aspidaClient(jwtToken)
      .posts._postID(Number(params.id))
      .$get();
    const comments: Entity_Comment[] = postedItemsDetail.comments;
    const meId = await (await aspidaClient(jwtToken).users.me.$get()).id;
    return (
      <div className="flex-1 grid gap-4 container">
        <PostDetail
          postItem={postedItemsDetail}
          jwtToken={jwtToken}
          imgPath="/img/dots/character/character_kishi_man_01_red_black.svg"
          meId={meId}
        />
        <div className="grid grid-cols-3">
          {comments.map((data) => (
            <CommentItem
              key={data.id}
              comment={data}
              jwtToken={jwtToken}
              meId={meId}
            />
          ))}
        </div>
        <div className="fixed bottom-0 left-0 w-full z-30 bg-transparent">
          <DetailFooterLayer
            jwtToken={jwtToken}
            session={session}
            postId={postedItemsDetail.id}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="justify-center container gap-4">
        <div className="nes-container is-dark with-title">
          <p className="title">Error</p>
          <p>データ取得に失敗しました…</p>
        </div>
        <div className="flex gap-2">
          <SignInSignOutButton session={session} />
          <Button variant="nesPrimary" asChild>
            <Link href="/">まちへもどる</Link>
          </Button>
        </div>
      </div>
    );
  }
}
