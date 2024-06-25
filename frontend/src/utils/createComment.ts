"use server";

import { aspidaClient } from "@/lib/aspidaClient";
import type { commentFormSchema } from "@/lib/zod";
import type { z } from "zod";

type createCommentFormType = z.infer<typeof commentFormSchema>;

type Props = {
  formdata: createCommentFormType;
  jwtToken: string;
  postId: number;
};

export const createComment = async ({ formdata, jwtToken, postId }: Props) => {
  try {
    const res = await aspidaClient(jwtToken).comments.post({
      body: {
        body: formdata.body,
        postId: postId,
      },
    });
    if (res.status !== 204) {
      throw new Error("コメントに失敗しました...");
    }
  } catch (error) {
    throw new Error("コメントに失敗しました...");
  }
};
