import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string({
      required_error: "ユーザーネームは必須です。",
    })
    .describe("ユーザーネーム"),
  password: z
    .string({
      required_error: "パスワードは必須です。",
    })
    .min(8, {
      message: "パスワードは8文字以上である必要があります。",
    })
    .describe("パスワード"),
});

export const signUpFormSchema = z.object({
  username: z
    .string({
      required_error: "ユーザーネームは必須です。",
    })
    .describe("ユーザーネーム"),
  password: z
    .string({
      required_error: "パスワードは必須です。",
    })
    .min(8, {
      message: "パスワードは8文字以上である必要があります。",
    })
    .describe("パスワード"),
});

export const postFormSchema = z.object({
  title: z
    .string({ required_error: "タイトルを入力してください" })
    .describe("タイトル"),
  body: z.string({ required_error: "本文を入力してください" }).describe("内容"),
});

export const commentFormSchema = z.object({
  body: z
    .string({ required_error: "コメントを入力してください" })
    .describe("コメント"),
});

export const editPostFormSchema = z.object({
  title: z.string().describe("タイトル").min(1, "タイトルを入力してください"),
  body: z.string().describe("内容").min(1, "内容を入力してください"),
});
