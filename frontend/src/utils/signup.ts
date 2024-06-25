"use server";
import type { signUpFormSchema } from "@/lib/zod";
import type { z } from "zod";
import { aspidaClient } from "@/lib/aspidaClient";

type signUpFormType = z.infer<typeof signUpFormSchema>;

export const serversideSignUp = async (formdata: signUpFormType) => {
  await signUp(formdata);
};

async function signUp(formdata:signUpFormType){
    await aspidaClient("").users.post({
        body: formdata
    })
}