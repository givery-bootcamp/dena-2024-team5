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
