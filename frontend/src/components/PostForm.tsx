"use client";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";

export function PostForm() {
  const formSchema = z.object({
    title: z
      .string({ required_error: "タイトルを入力してください" })
      .describe("タイトル"),
    body: z
      .string({ required_error: "本文を入力してください" })
      .describe("内容"),
  });

  return (
    <div className="grid gap-8">
      <AutoForm
        formSchema={formSchema}
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
        <AutoFormSubmit className="w-full">投稿</AutoFormSubmit>
      </AutoForm>
    </div>
  );
}
