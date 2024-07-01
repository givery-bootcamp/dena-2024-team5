"use client";

import { isValErrorAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const PostFormButton = () => {
  const [isValError] = useAtom(isValErrorAtom);
  return (
    <Button
      variant="nesPrimary"
      type="submit"
      form="post-form"
      onClick={() => {
        if (isValError) {
          toast.error("入力内容に誤りがあります");
          return;
        }
      }}
    >
      投稿
    </Button>
  );
};
