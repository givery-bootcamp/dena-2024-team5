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
import {
  isAudioOnAtom,
  isCommentEditModeAtom,
  isEditModeAtom,
} from "@/lib/atom";
import { useAtom } from "jotai";
import { Pen, Send } from "lucide-react";

type Props = {
  session: Session | null;
};

export const SignInSignOutButton = ({ session }: Props) => {
  if (session) {
    return <SignOutDialog />;
  }
  return (
    <Button asChild>
      <Link href="/signin">サインイン</Link>
    </Button>
  );
};

const SignOutDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="nesNormal">サインアウト</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>確認</DialogTitle>
        </DialogHeader>
        <DialogDescription>サインアウトしますか?</DialogDescription>
        <DialogFooter>
          <Button
            variant="nesError"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            サインアウト
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const PostButton = () => {
  return (
    <Button variant="nesPrimary" asChild>
      <Link href="/posts/new">
        <Send className="mr-2 h-4 w-4" />
        ポストする
      </Link>
    </Button>
  );
};

export const CommentPostButton = ({ postId }: { postId: number }) => {
  const href = `/comments/new/${postId.toString()}`;
  return (
    <Button variant="nesPrimary" asChild>
      <Link href={href}>
        <Send className="mr-2 h-4 w-4" />
        ゆうしゃを応援する
      </Link>
    </Button>
  );
};

export const PostEditButton = () => {
  const [_, setIsEditMode] = useAtom(isEditModeAtom);
  return (
    <Button onClick={() => setIsEditMode(true)} variant="nesPrimary">
      <Pen className="mr-2 h-4 w-4" />
      編集する
    </Button>
  );
};

export const PostEditCancelButton = () => {
  const [_, setIsEditMode] = useAtom(isEditModeAtom);
  return (
    <Button variant="nesNormal" onClick={() => setIsEditMode(false)}>
      キャンセル
    </Button>
  );
};

export const CommentEditButton = ({ commentId }: { commentId: number }) => {
  const [_, setIsEditMode] = useAtom(isCommentEditModeAtom(commentId));
  return (
    <Button variant="nesNormal" size="icon" onClick={() => setIsEditMode(true)}>
      <Pen />
    </Button>
  );
};
export const CommentEditCancelButton = ({
  commentId,
}: { commentId: number }) => {
  const [_, setIsEditMode] = useAtom(isCommentEditModeAtom(commentId));
  return (
    <Button variant="nesNormal" onClick={() => setIsEditMode(false)}>
      キャンセル
    </Button>
  );
};

export const AudioButton = () => {
  const [_, setIsAudioOn] = useAtom(isAudioOnAtom);
  // const audio = new Audio("/audio/maou_bgm_orchestra20.mp3");
  const [isAudioOn] = useAtom(isAudioOnAtom);

  return (
    <Button onClick={() => setIsAudioOn(!isAudioOn)} variant="nesNormal">
      BGM on/off
    </Button>
  );
};
