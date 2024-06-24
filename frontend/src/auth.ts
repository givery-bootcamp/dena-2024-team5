import { aspidaClient } from "@/lib/aspidaClient";
import { loginFormSchema } from "@/lib/zod";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { ZodError } from "zod";

class CustomError extends CredentialsSignin {
  code = "custom_error";
}

interface CookieOptions {
  path?: string;
  domain?: string;
  maxAge?: number;
  sameSite?: "Strict" | "Lax" | "None";
}

interface CookieObject {
  name: string;
  value: string;
  options: CookieOptions;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const { username, password } =
            await loginFormSchema.parseAsync(credentials);
          const userInfo = await aspidaClient("").signin.post({
            body: { username, password },
          });
          // set-cookieの値を読み取ってcookieにセットする
          // これにより次回以降のリクエストで認証情報が送信される
          // set-cookie
          const cookie = userInfo.headers["set-cookie"];
          const cookieRegex = /([^=;\s]+)=([^;]*)/g;
          let match: RegExpExecArray | null;
          const cookieDict: { [key: string]: string } = {};

          while ((match = cookieRegex.exec(cookie))) {
            const key = match[1].trim();
            const value = match[2].trim();
            cookieDict[key] = value;
          }

          // cookies().set()に渡すオブジェクトを作成
          const cookieObj: CookieObject = {
            name: "jwt",
            value: cookieDict["jwt"],
            options: {
              path: cookieDict["Path"],
              domain: cookieDict["Domain"],
              maxAge: cookieDict["Max-Age"]
                ? Number.parseInt(cookieDict["Max-Age"])
                : undefined,
              sameSite: cookieDict["SameSite"] as "Strict" | "Lax" | "None",
            },
          };
          // cookies().set("jwt", cookie);
          // jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTg3ODQ1MjMsInVzZXJfaWQiOjF9.AvvpqEeIim5YRhWWfUiHzV7lAPgnkAkZGrjq85dP8DM; Path=/; Domain=localhost; Max-Age=86400; SameSite=Noneをパースしてcookieにセットする
          cookies().set(cookieObj);

          // TODO aspidaによる認証情報を返す
          if (userInfo) {
            user = userInfo.body;
          }
          if (!user) {
            throw new Error("No user found");
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw new Error();
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
