"use server";

import { aspidaClient } from "@/lib/aspidaClient";

export const addLike = async ({
  postId,
  jwtToken,
}: {
  postId: number;
  jwtToken: string;
}) => {
  try {
    const res = await aspidaClient(jwtToken).posts._postID(postId).like.post();
    console.log(res);
    if (res.status !== 204) {
      throw new Error("いいねに失敗しました...");
    }
  } catch (error) {
    throw new Error("サーバーエラーが発生しました...");
  }
};
