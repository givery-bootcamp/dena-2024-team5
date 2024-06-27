"use client";
import { editPostFormSchema } from "@/lib/zod";
import { createPost } from "@/utils/createPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type Props = {
  jwtToken: string;
};

type onSubmitType = z.infer<typeof editPostFormSchema>;

export const PostForm = ({ jwtToken }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPostFormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const onSubmit = async (formdata: onSubmitType) => {
    try {
      await createPost({ formdata, jwtToken });
      toast({
        description: "投稿に成功しました!",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "投稿に失敗しました...",
      });
    }
  };

  return (
    <form className="flex-1 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-sm">タイトル</span>
      <Input {...register("title")} className="nes-input" />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
      <span className="text-sm">内容</span>
      <Textarea {...register("body")} className="nes-textarea" />
      {errors.body && (
        <p className="text-red-500 text-sm">{errors.body.message}</p>
      )}
      <Button type="submit" variant="nesPrimary">
        投稿する
      </Button>
    </form>
  );
};
