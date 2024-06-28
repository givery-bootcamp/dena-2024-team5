"use client";
import { editPostFormSchema } from "@/lib/zod";
import { createPost } from "@/utils/createPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPostFormSchema),
    defaultValues: {
      title: "",
      body: "",
      file: undefined,
    },
  });
  const onSubmit = async (formdata: onSubmitType) => {
    try {
      await createPost({ formdata, jwtToken });
      reset();
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
          <TabsTrigger
            value="attachment"
            className="data-[state=active]:bg-[#8c959b]"
          >
            しるし
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
        <TabsContent value="attachment">
          <span className="text-sm">
            ファイル
            {errors.file && (
              <span className="text-red-500 text-sm">
                *{errors.file.message}*
              </span>
            )}
          </span>
          <Input
            {...register("file")}
            className="nes-input is-dark"
            type="file"
          />
        </TabsContent>
      </Tabs>
    </form>
  );
};
