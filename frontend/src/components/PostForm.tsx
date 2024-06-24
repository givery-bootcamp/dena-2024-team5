"use client";
import { postFormSchema } from "@/lib/zod";
import { createPost } from "@/utils/createPost";
import { redirect } from "next/navigation";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";

type Props = {
  jwtToken: string;
};

export const PostForm = ({ jwtToken }: Props) => {
  return (
    <div className="grid gap-8">
      <AutoForm
        formSchema={postFormSchema}
        onSubmit={(formdata) => {
          try {
            createPost({ formdata, jwtToken });
            redirect("/dashboard");
          } catch (error) {
            console.error(error);
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
