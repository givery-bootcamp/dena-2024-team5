"use client";
import Link from "next/link";

export default function SiginInSignUpCard() {
  return (
    <div className="grid grid-cols-2 gap-4 p-12">
      <Link href="signin" type="button" className="nes-btn is-success text-xl">
        サインイン
      </Link>
      <Link href="signup" type="button" className="nes-btn is-warning text-xl">
        サインアップ
      </Link>
    </div>
  );
}
