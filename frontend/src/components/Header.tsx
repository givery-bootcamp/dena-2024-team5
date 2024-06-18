import Link from "next/link";
import { SignInSignOutButton } from "./Buttons";
import { ModeToggle } from "./ThemeChanger";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link href="/">
        <h1 className="text-2xl font-bold">Header</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <SignInSignOutButton session={session} />
        <ModeToggle />
      </div>
    </header>
  );
}
