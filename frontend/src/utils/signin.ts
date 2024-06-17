import { signIn } from "@/auth";

export const serversideSignin = async (data: any) => {
  await signIn("credentials", data);
  console.log("Sign in success");
};
