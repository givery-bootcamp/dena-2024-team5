"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { serversideSignin } from "@/utils/signIn";
import Link from "next/link";
import * as z from "zod";

export const formSchema = z.object({
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

export function LoginForm() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          ユーザーネームとパスワードを入力してください
        </CardDescription>
      </CardHeader>
      <AutoForm
        formSchema={formSchema}
        onSubmit={(values) => {
          serversideSignin(values);
        }}
        fieldConfig={{
          username: {
            inputProps: {
              name: "username",
              placeholder: "ユーザーネーム",
            },
          },
          password: {
            inputProps: {
              name: "password",
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
