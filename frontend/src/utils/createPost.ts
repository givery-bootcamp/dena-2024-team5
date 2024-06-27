"use server";

import { aspidaClient } from "@/lib/aspidaClient";
import type { editPostFormSchema } from "@/lib/zod";
import type { z } from "zod";

type createPostFormType = z.infer<typeof editPostFormSchema>;

type Props = {
  formdata: createPostFormType;
  jwtToken: string;
};

export const createPost = async ({ formdata, jwtToken }: Props) => {
  try {
    const res = await aspidaClient(jwtToken).posts.post({
      body: formdata,
    });
    if (res.status !== 204) {
      throw new Error("投稿に失敗しました...");
    }
  } catch (error) {
    throw new Error("投稿に失敗しました...");
  }
};
