"use server";
import { signIn } from "@/auth";
import type { loginFormSchema } from "@/lib/zod";
import type { z } from "zod";

type loginFormType = z.infer<typeof loginFormSchema>;

export const serversideSignIn = async (formdata: loginFormType) => {
  await signIn("credentials", formdata);
};
