"use server";

import { aspidaClient } from "@/lib/aspidaClient";

type Props = {
  commentId: number;
  jwtToken: string;
};

export const deleteComment = async ({ commentId, jwtToken }: Props) => {
  try {
    const res = await aspidaClient(jwtToken)
      .comments._commentID(commentId)
      .delete();
    if (res.status !== 204) {
      throw new Error("削除に失敗しました...");
    }
  } catch (error) {
    throw new Error("サーバーエラーが発生しました...");
  }
};
