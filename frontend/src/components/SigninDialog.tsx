"use client";
import { SigninForm } from "./SigninForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const SigninDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="nesSuccess" className="text-xl rounded-none h-12 z-10">
          ゆうしゃをふっかつさせる
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ゆうしゃをふっかつさせる</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ふっかつのじゅもんを いれてください
        </DialogDescription>
        <SigninForm />
      </DialogContent>
    </Dialog>
  );
};
