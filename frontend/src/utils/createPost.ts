"use server";

import { aspidaClient } from "@/lib/aspidaClient";
import type { editPostFormSchema } from "@/lib/zod";
import type { z } from "zod";

type createPostFormType = z.infer<typeof editPostFormSchema>;

type Props = {
  formdata: Omit<createPostFormType, "image">;
  buffer: ArrayBuffer;
  jwtToken: string;
};

export const createPost = async ({ buffer, formdata, jwtToken }: Props) => {
  // arraybuffer to File
  // TODO: typeは後で特定させる
  const file = new File([new Uint8Array(buffer)], "image.png", { type: "image/png" });
  try {
    const res = await aspidaClient(jwtToken).posts.post({
      body: {
        ...formdata,
        image: file,
      },
    });
    if (res.status !== 204) {
      throw new Error("投稿に失敗しました...");
    }
  } catch (error) {
    console.log(error);
    throw new Error("投稿に失敗しました...");
  }
};
