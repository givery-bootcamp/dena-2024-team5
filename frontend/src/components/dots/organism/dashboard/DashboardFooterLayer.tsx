import { AudioButton, SignInSignOutButton } from "@/components/Buttons";
import { MyAvatar } from "@/components/MyAvatar";
import { PostFormButton } from "@/components/PostButton";
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
    <div className="flex justify-center gap-4 items-center my-4">
      <MyAvatar session={session} />
      <div className="flex-1 nes-container items-center is-dark bg-white max-w-3xl">
        <PostForm jwtToken={jwtToken} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <PostFormButton />
        <AudioButton />
        <SignInSignOutButton session={session} />
      </div>
    </div>
  );
}
