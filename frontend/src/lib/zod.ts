import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "半角英数字のみを使用してください。",
    })
    .describe("ユーザーネーム"),
  password: z
    .string()
    .min(8, {
      message: "ふっかつのじゅもんは8文字以上である必要があります。",
    })
    .regex(/^[ -~]*$/, {
      message: "ふっかつのじゅもんは半角英数字と記号のみを使用してください。",
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

export const commentFormSchema = z.object({
  body: z
    .string({ required_error: "コメントを入力してください" })
    .describe("コメント"),
});

export const editPostFormSchema = z.object({
  title: z.string().describe("タイトル").min(1, "タイトルを入力してください"),
  body: z.string().describe("内容").min(1, "内容を入力してください"),
});

export const editCommentFormSchema = z.object({
  body: z.string().describe("コメント").min(1, "コメントを入力してください"),
});
