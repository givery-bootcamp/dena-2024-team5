"use server";
import { aspidaClient } from "@/lib/aspidaClient";
import type { signUpFormSchema } from "@/lib/zod";
import type { z } from "zod";
import { saltAndHash } from "./encrypt";

type signUpFormType = z.infer<typeof signUpFormSchema>;

export const serversideSignUp = async (formdata: signUpFormType) => {
  try {
    await signUp(formdata);
  } catch (error) {
    console.error(error);
    throw new Error("サーバーエラーが発生しました");
  }
};

const signUp = async (formdata: signUpFormType) => {
  const passwordHash = saltAndHash(formdata.password);
  try {
    const res = await aspidaClient("").users.post({
      body: {
        username: formdata.username,
        password: passwordHash,
      },
    });
    if (res.status !== 200) {
      throw new Error("アカウント作成に失敗しました");
    }
  } catch (error) {
    console.error(error);
    throw new Error("サーバーエラーが発生しました");
  }
};
