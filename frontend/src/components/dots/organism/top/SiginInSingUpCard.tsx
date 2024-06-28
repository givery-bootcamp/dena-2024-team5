"use client";
import { useRouter } from "next/navigation";
import { Link } from "lucide-react";

export default function SiginInSignUpCard() {
  const router = useRouter();

  return (
    <div className="p-12 pt-0">
      <div className=" h-full nes-container is-dark with-title is-centered">
        <div className="title">
          <p className="text-3xl">世界に入る方法を選んでください</p>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <Link
            href="signin"
            type="button"
            className="nes-btn is-success text-xl"
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
    </div>
  );
}
