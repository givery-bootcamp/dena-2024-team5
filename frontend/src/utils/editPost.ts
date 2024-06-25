"use server";

import { aspidaClient } from "@/lib/aspidaClient";
import type { editPostFormSchema } from "@/lib/zod";
import type { z } from "zod";

type editPostFormType = z.infer<typeof editPostFormSchema>;

type Props = {
  postId: number;
  jwtToken: string;
  editData: editPostFormType;
};

export const editPost = async ({ postId, jwtToken, editData }: Props) => {
  try {
    const res = await aspidaClient(jwtToken)
      .posts._postID(postId)
      .put({ body: editData });
    if (res.status !== 204) {
      throw new Error("編集に失敗しました...");
    }
  } catch (error) {
    throw new Error("サーバーエラーが発生しました...");
  }
};
