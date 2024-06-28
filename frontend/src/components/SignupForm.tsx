"use client";
import { signUpFormSchema } from "@/lib/zod";
import { serversideSignUp } from "@/utils/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

type onSubmitType = z.infer<typeof signUpFormSchema>;

export const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (formdata: onSubmitType) => {
    try {
      await serversideSignUp(formdata);
      toast({
        description: "あなたはゆうしゃとしてとうろくされました！",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "ゆうしゃになれませんでした…",
      });
    }
  };

  return (
    <form className="flex-1 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-sm">ゆうしゃの名前</span>
      <Input {...register("username")} className="nes-input" />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}
      <span className="text-sm">ふっかつのじゅもん</span>
      <Input
        {...register("password")}
        type="password"
        className="nes-textarea"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <span className="text-sm">ふっかつのじゅもんを再入力</span>
      <Input
        {...register("confirmPassword")}
        type="password"
        className="nes-textarea"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}
      <Button type="submit" variant="nesWarning">
        ゆうしゃになる
      </Button>
    </form>
  );
};
