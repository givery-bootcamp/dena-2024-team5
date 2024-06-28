"use client";
import { SignupForm } from "./SignupForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const SignupDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="nesWarning" className="text-xl rounded-none h-12 z-10">
          ゆうしゃになる
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ゆうしゃになる</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          あなたの名前とふっかつのじゅもんを入力してください
        </DialogDescription>
        <SignupForm />
      </DialogContent>
    </Dialog>
  );
};
