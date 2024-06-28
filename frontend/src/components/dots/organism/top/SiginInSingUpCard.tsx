"use client";
import { SigninDialog } from "@/components/SigninDialog";
import { SignupDialog } from "@/components/SignupDialog";

export const SiginInSignUpCard = () => {
  return (
    <div className="p-12 pt-0 ">
      <div className="h-full nes-container is-dark with-title is-centered">
        <div className="title">
          <p className="text-3xl">世界に入る方法を選んでください</p>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <SigninDialog />
          <SignupDialog />
        </div>
      </div>
      {/* スクロール調整用↓ */}
      <div className="h-40" />
    </div>
  );
};
