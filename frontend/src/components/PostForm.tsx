"use client";
import { postFormSchema } from "@/lib/zod";
import { createPost } from "@/utils/createPost";
import { useRouter } from "next/navigation";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import { useToast } from "./ui/use-toast";

type Props = {
  jwtToken: string;
};

export const PostForm = ({ jwtToken }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  return (
    <div className="grid gap-8">
      <AutoForm
        formSchema={postFormSchema}
        onSubmit={(formdata) => {
          try {
            createPost({ formdata, jwtToken });
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
        }}
        fieldConfig={{
          title: {
            inputProps: {
              type: "text",
              placeholder: "タイトル",
            },
          },
          body: {
            fieldType: "textarea",
            inputProps: {
              placeholder: "なにか書いてくださいお願いしますほんとうにお願い",
            },
          },
        }}
      >
        <AutoFormSubmit className="w-full">投稿する</AutoFormSubmit>
      </AutoForm>
    </div>
  );
};
