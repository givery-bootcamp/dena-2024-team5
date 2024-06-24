"use server";

import { aspidaClient } from "@/lib/aspidaClient";
import type { postFormSchema } from "@/lib/zod";
import type { z } from "zod";

type createPostFormType = z.infer<typeof postFormSchema>;

type Props = {
  formdata: createPostFormType;
  jwtToken: string;
};

export const createPost = async ({ formdata, jwtToken }: Props) => {
  try {
    const res = await aspidaClient(jwtToken).posts.$post({
      body: formdata,
    });
  } catch (error) {
    console.error(error);
  }
};
