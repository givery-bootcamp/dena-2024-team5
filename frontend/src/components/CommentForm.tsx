"use client";
import { commentFormSchema } from "@/lib/zod";
import { createComment } from "@/utils/createComment";
import { useRouter } from "next/navigation";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import { useToast } from "./ui/use-toast";

type Props = {
  jwtToken: string;
  postId: number;
};

export const CommentForm = ({ jwtToken, postId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  return (
    <div className="grid gap-8">
      <AutoForm
        formSchema={commentFormSchema}
        onSubmit={async (formdata) => {
          try {
            await createComment({ formdata, jwtToken, postId});
            toast({
              description: "コメントに成功しました!",
            });
            router.push("/posts/"+postId.toString());
          } catch (error) {
            console.error(error);
            toast({
              variant: "destructive",
              description: "コメントに失敗しました...",
            });
          }
        }}
        fieldConfig={{
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
