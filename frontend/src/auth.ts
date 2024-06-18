import { aspidaClient } from "@/lib/aspidaClient";
import { loginFormSchema } from "@/lib/zod";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

class CustomError extends CredentialsSignin {
  code = "custom_error";
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
          const userInfo = await aspidaClient.signin
            .post({
              body: { username, password },
            })
            .catch((e) => {
              return null;
            });
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
