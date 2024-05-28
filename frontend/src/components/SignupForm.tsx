import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  return (
    <Card className="max-w-md w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>個人情報を入力してください</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid col-span-2 gap-2">
              <Label htmlFor="name">名前</Label>
              <Input id="name" placeholder="username" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            アカウント作成
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          アカウントをお持ちの場合{" "}
          <Link href="/login" className="underline">
            ログイン
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
