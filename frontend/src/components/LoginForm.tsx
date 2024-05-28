import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
            メールアドレスとパスワードを入力してください
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="grid">
        <Button className="w-full">ログイン</Button>
        <div className="mt-4 text-center text-sm">
        アカウントをお持ちでない場合{" "}
          <Link href="/signup" className="underline">
            登録
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}



