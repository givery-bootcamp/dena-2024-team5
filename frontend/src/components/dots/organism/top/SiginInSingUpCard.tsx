"use client";
import Link from "next/link";

export default function SiginInSignUpCard() {
  return (
    <div className="p-12 pt-0 ">
      <div className="h-full nes-container is-dark with-title is-centered">
        <div className="title">
          <p className="text-3xl">世界に入る方法を選んでください</p>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <Link
            href="signin"
            type="button"
            className="nes-btn is-success text-xl z-10"
          >
            サインイン
          </Link>
          <Link
            href="signup"
            type="button"
            className="nes-btn is-warning text-xl"
          >
            サインアップ
          </Link>
        </div>
      </div>
      {/* スクロール調整用↓ */}
      <div className="h-40" />
    </div>
  );
}
