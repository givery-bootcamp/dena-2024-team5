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
    .describe("ふっかつのじゅもん"),
});

export const signUpFormSchema = z
  .object({
    username: z
      .string({
        required_error: "ゆうしゃの名前は必須です。",
      })
      .regex(/^[a-zA-Z0-9]*$/, {
        message: "ゆうしゃの名前は半角英数字のみを使用してください。",
      })
      .min(1, { message: "ゆうしゃの名前は1文字以上である必要があります。" })
      .max(40, { message: "ゆうしゃの名前は40文字以内である必要があります。" })
      .describe("ゆうしゃの名前"),
    password: z
      .string({
        required_error: "ふっかつのじゅもんは必須です。",
      })
      .regex(/^[ -~]*$/, {
        message: "ふっかつのじゅもんは半角英数字と記号のみを使用してください。",
      })
      .min(8, {
        message: "ふっかつのじゅもんは8文字以上である必要があります。",
      })
      .max(100, {
        message: "ふっかつのじゅもんは100文字以内である必要があります。",
      })
      .describe("ふっかつのじゅもん"),
    confirmPassword: z.string({
      required_error: "ふっかつのじゅもんを再入力してください。",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "ふっかつのじゅもんが一致しません。",
        code: z.ZodIssueCode.custom,
      });
    }
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
