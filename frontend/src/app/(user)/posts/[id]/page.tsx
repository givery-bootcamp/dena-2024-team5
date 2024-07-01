import { auth } from "@/auth";
import { CommentItem } from "@/components/CommentItem";
import { PostDetail } from "@/components/PostDetail";
import DetailFooterLayer from "@/components/dots/organism/detail/DetailFooterLayer";
import { aspidaClient } from "@/lib/aspidaClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Entity_Comment } from "../../../../../api/@types";

export default async function Home({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  const session = await auth();
  if (!session) {
    redirect("/");
  }

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
      {/* <div className="border-b px-4" /> */}
      {/* <CommentPostButton postId={postedItemsDetail.id} /> */}
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
}
