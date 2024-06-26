"use server";

import { aspidaClient } from "@/lib/aspidaClient";
import type { editCommentFormSchema } from "@/lib/zod";
import type { z } from "zod";

type editCommentFormType = z.infer<typeof editCommentFormSchema>;

type Props = {
  id: number;
  jwtToken: string;
  editData: editCommentFormType;
};

export const editComment = async ({ id, jwtToken, editData }: Props) => {
  try {
    const res = await aspidaClient(jwtToken)
      .comments._commentID(id)
      .put({ body: editData });
    if (res.status !== 204) {
      throw new Error("編集に失敗しました...");
    }
  } catch (error) {
    throw new Error("サーバーエラーが発生しました...");
  }
};
