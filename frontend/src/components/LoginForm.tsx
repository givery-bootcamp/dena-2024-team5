"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginFormSchema } from "@/lib/zod";
import { serversideSignIn } from "@/utils/signIn";
import Link from "next/link";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import FlipContainer from "./dots/atom/FlipContainer";
import FlipBox from "./dots/atom/FlipBox";
gsap.registerPlugin(Flip);

export function LoginForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = Flip.getState(".box");
    Flip.from(state, {
      duration: 3,
      absolute: true,
    });
  }, []);
  return (
    <Card className="w-full max-w-md border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-4xl text-center">Login</CardTitle>
        <CardDescription>ふっかつのじゅもんを いれてください</CardDescription>
        <FlipContainer>
          <FlipBox className="red">Box A</FlipBox>
          <FlipBox className="red">Box B</FlipBox>
          <style jsx>{`
        .red {
          background-color: lightcoral;
        }
      `}</style>
        </FlipContainer>
      </CardHeader>
      <AutoForm
        formSchema={loginFormSchema}
        onSubmit={(values) => {
          serversideSignIn(values);
        }}
        fieldConfig={{
          username: {
            inputProps: {
              name: "username",
              placeholder: "ユーザーネーム",
              className: "nes-input",
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
        <AutoFormSubmit className="w-full">ログイン</AutoFormSubmit>
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
