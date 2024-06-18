"use client";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  session: Session | null;
};

export function SignInSignOutButton({ session }: Props) {
  if (session) {
    return <SignOutDialog />;
  }
  return (
    <Button asChild>
      <Link href="/signin">サインイン</Link>
    </Button>
  );
}

const SignOutDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>サインアウト</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>確認</DialogTitle>
        </DialogHeader>
        <DialogDescription>サインアウトしますか?</DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={() => signOut()}>
            サインアウト
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
