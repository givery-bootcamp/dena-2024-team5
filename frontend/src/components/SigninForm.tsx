"use client";
import { loginFormSchema } from "@/lib/zod";
import { serversideSignIn } from "@/utils/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type onSubmitType = z.infer<typeof loginFormSchema>;

export const SigninForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (formdata: onSubmitType) => {
    try {
      await serversideSignIn(formdata);
      toast.success("ゆうしゃをふっかつさせました！");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("じゅもんがまちがっています！");
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
      <Button type="submit" variant="nesSuccess">
        ゆうしゃをふっかつさせる
      </Button>
    </form>
  );
};
