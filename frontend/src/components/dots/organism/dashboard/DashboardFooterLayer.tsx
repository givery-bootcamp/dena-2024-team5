import { SignInSignOutButton } from "@/components/Buttons";
import { PostForm } from "@/components/PostForm";
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
      <div className="flex-1 nes-container items-center is-dark bg-white max-w-4xl">
        <PostForm jwtToken={jwtToken} />
      </div>
      <SignInSignOutButton session={session} />
    </div>
  );
}
