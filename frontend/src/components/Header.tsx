import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./ThemeChanger";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link href="/">
        <h1 className="text-2xl font-bold">Header</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Button>Sign In</Button>
        <ModeToggle />
      </div>
    </header>
  );
}
