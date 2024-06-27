"use client";

import { deletePost } from "@/utils/deletePost";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useToast } from "./ui/use-toast";

type PostDeleteButtonProps = {
  postId: number;
  jwtToken: string;
};

export const PostDeleteDialog = ({
  postId,
  jwtToken,
}: PostDeleteButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();
  return (
    <Dialog>
      <div className="grid items-end">
        <DialogTrigger asChild>
          <Button variant="nesError">
            <Image
              src="/img/dots/item/kokubankeshi_01.svg"
              alt="image"
              width="90"
              height="30"
            />
            削除
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
                  toast({
                    description: "🔥削除に成功しました!🔥",
                  });
                } catch (error) {
                  console.error(error);
                  toast({
                    variant: "destructive",
                    description: "削除に失敗しました...😭",
                  });
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
