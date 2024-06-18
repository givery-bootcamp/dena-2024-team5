"use server";
import { signIn } from "@/auth";
import type { z } from "zod";
import type { loginFormSchema } from "./login";

type loginFormType = z.infer<typeof loginFormSchema>;

export const serversideSignIn = async (formdata: loginFormType) => {
  await signIn("credentials", formdata);
};
