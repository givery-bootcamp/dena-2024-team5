"use client";
import { isValErrorAtom } from "@/lib/atom";
import { postFormSchema } from "@/lib/zod";
import { createPost } from "@/utils/createPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

type Props = {
  jwtToken: string;
};

type onSubmitType = z.infer<typeof postFormSchema>;

export const PostForm = ({ jwtToken }: Props) => {
  const router = useRouter();
  const [isValError, setIsValError] = useAtom(isValErrorAtom);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const onSubmit = async (formdata: onSubmitType) => {
    try {
      await createPost({ formdata, jwtToken });
      reset();
      toast.success("投稿に成功しました!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("投稿に失敗しました...");
    }
  };
  useEffect(() => {
    setIsValError((errors.title && true) || (errors.body && true) || false);
  }, [errors.title, errors.body, setIsValError]);

  return (
    <form
      className="flex-1 grid gap-4 h-36"
      id="post-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Tabs defaultValue="title" className="flex-1">
        <TabsList className="dark bg-[#212528]">
          <TabsTrigger
            value="title"
            className="data-[state=active]:bg-[#8c959b]"
          >
            タイトル
          </TabsTrigger>
          <TabsTrigger
            value="body"
            className="data-[state=active]:bg-[#8c959b]"
          >
            内容
          </TabsTrigger>
        </TabsList>
        <TabsContent value="title">
          <span className="text-sm">
            タイトル
            {errors.title && (
              <span className="text-red-500 text-sm">
                *{errors.title.message}*
              </span>
            )}
          </span>
          <Input {...register("title")} className="nes-input is-dark" />
        </TabsContent>
        <TabsContent value="body">
          <span className="text-sm">
            内容
            {errors.body && (
              <span className="text-red-500 text-sm">
                *{errors.body.message}*
              </span>
            )}
          </span>
          <Textarea
            {...register("body")}
            className="nes-textarea is-dark resize-none"
          />
        </TabsContent>
      </Tabs>
    </form>
  );
};
