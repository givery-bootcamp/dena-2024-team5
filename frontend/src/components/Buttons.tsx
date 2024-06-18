"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export function SignInSignOutButton({ session }: Props) {
  if (session) {
    return (
      <div>
        <Button onClick={() => signOut()}>サインアウト</Button>
      </div>
    );
  }
  return (
    <Button asChild>
      <Link href={"/signin"}>サインイン</Link>
    </Button>
  );
}
