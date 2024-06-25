"use server";

import { aspidaClient } from "@/lib/aspidaClient";

type Props = {
  postId: number;
  jwtToken: string;
};

export const deletePost = async ({ postId, jwtToken }: Props) => {
  try {
    const res = await aspidaClient(jwtToken)
      .posts._postID_number(postId)
      .delete();
    if (res.status !== 204) {
      throw new Error("削除に失敗しました...");
    }
  } catch (error) {
    throw new Error("サーバーエラーが発生しました...");
  }
};
