import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        user = { id: "1", name: "taro" };
        if (!user) {
          throw new Error("No user found");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
