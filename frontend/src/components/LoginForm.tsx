"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string({
      required_error: "メールアドレスは必須です。",
    })
    .email({
      message: "メールアドレスの形式が正しくありません。",
    })
    .describe("メールアドレス"),
  pass: z
    .string({
      required_error: "パスワードは必須です。",
    })
    .min(8, {
      message: "パスワードは8文字以上である必要があります。",
    })
    .describe("パスワード"),
});

export function LoginForm() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          メールアドレスとパスワードを入力してください
        </CardDescription>
      </CardHeader>
      <AutoForm
        onSubmit={(data) => console.log(data)}
        formSchema={formSchema}
        fieldConfig={{
          email: {
            inputProps: {
              type: "email",
              placeholder: "example@example.com",
            },
          },
          pass: {
            inputProps: {
              type: "password",
              placeholder: "••••••••",
            },
          },
        }}
      >
        <AutoFormSubmit>送信</AutoFormSubmit>
        <div className="mt-4 text-center text-sm">
          アカウントをお持ちでない場合{" "}
          <Link href="/signup" className="underline">
            登録
          </Link>
        </div>
      </AutoForm>
    </Card>
  );
}
