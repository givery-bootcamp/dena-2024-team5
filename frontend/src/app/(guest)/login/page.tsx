// "use client";
import { LoginForm } from "@/components/LoginForm";
import { cookies } from "next/headers";

export default function LoginPage() {
  const cookieStore = cookies();
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <LoginForm />
    </div>
  );
}
