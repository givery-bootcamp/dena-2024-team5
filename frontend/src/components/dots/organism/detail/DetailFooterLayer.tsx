import { AudioButton } from "@/components/Buttons";
import { CommentForm } from "@/components/CommentForm";
import { MyAvatar } from "@/components/MyAvatar";
import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";
import Link from "next/link";
type PanelProps = {
  jwtToken: string;
  session: Session;
  postId: number;
};

export default function DetailFooterLayer({
  jwtToken,
  session,
  postId,
}: PanelProps) {
  return (
    <div className="flex justify-center gap-4 items-center my-4">
      <MyAvatar session={session} />
      <div className="flex-1 nes-container items-center is-dark bg-white max-w-3xl">
        <CommentForm jwtToken={jwtToken} postId={postId} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Button variant="nesPrimary" type="submit" form="comment-form">
          応援する
        </Button>
        <AudioButton />
        <Button variant="nesPrimary" asChild>
          <Link href="/dashboard">まちへもどる</Link>
        </Button>
      </div>
    </div>
  );
}
