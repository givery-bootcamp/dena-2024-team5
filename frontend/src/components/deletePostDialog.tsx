"use client";

import { deletePost } from "@/utils/deletePost";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type PostDeleteButtonProps = {
  postId: number;
  jwtToken: string;
};

export const PostDeleteDialog = ({
  postId,
  jwtToken,
}: PostDeleteButtonProps) => {
  const router = useRouter();
  return (
    <Dialog>
      <div className="grid items-end">
        <DialogTrigger asChild>
          <Button variant="nesError">
            <Trash className="mr-2 h-4 w-4" />
            削除する
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>確認</DialogTitle>
        </DialogHeader>
        <DialogDescription>削除しますか?</DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button
              variant="nesError"
              onClick={async () => {
                try {
                  await deletePost({ postId, jwtToken });
                  router.push("/dashboard");
                  toast.success("削除に成功しました！");
                } catch (error) {
                  console.error(error);
                  toast.error("削除に失敗しました...");
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              削除する
            </Button>
          </DialogClose>
          <DialogClose>
            <Button variant="nesNormal">キャンセル</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
