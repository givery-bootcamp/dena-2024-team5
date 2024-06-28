import { AudioButton } from "@/components/Buttons";
import { CommentForm } from "@/components/CommentForm";
import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";
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
    <div className="flex justify-center gap-4 items-center">
      フッター
      <div className="flex-1 nes-container items-center is-dark bg-white max-w-3xl">
        <CommentForm jwtToken={jwtToken} postId={postId} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Button variant="nesPrimary" type="submit" form="post-form">
          投稿
        </Button>
        <AudioButton />
        <a href="/">
          <Button variant="nesPrimary">まちへ戻る</Button>
        </a>
      </div>
    </div>
  );
}
