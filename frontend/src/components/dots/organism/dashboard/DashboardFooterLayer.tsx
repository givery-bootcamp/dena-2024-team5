import { AudioButton, SignInSignOutButton } from "@/components/Buttons";
import { PostForm } from "@/components/PostForm";
import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";
type PanelProps = {
  jwtToken: string;
  session: Session;
};

export default function DashboardFooterLayer({
  jwtToken,
  session,
}: PanelProps) {
  return (
    <div className="flex justify-center gap-4 items-center">
      フッター
      <div className="flex-1 nes-container items-center is-dark bg-white max-w-3xl">
        <PostForm jwtToken={jwtToken} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Button variant="nesPrimary" type="submit" form="post-form">
          投稿
        </Button>
        <div className="grid">
          <SignInSignOutButton session={session} />
        </div>
        <AudioButton />
      </div>
    </div>
  );
}
