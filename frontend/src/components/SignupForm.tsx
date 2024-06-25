"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpFormSchema } from "@/lib/zod";
import { serversideSignUp } from "@/utils/signup";
import Link from "next/link";

export function SignUpForm() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">SignUp</CardTitle>
        <CardDescription>
          ユーザーネームとパスワードを入力してください
        </CardDescription>
      </CardHeader>
      <AutoForm
        formSchema={signUpFormSchema}
        onSubmit={(values) => {
          serversideSignUp(values);
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
        <AutoFormSubmit className="w-full">登録</AutoFormSubmit>
        <div className="mt-4 text-center text-sm">
          アカウントをお持ちの場合{" "}
          <Link href="/signin" className="underline">
            ログイン
          </Link>
        </div>
      </AutoForm>
    </Card>
  );
}
