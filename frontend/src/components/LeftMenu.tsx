import Link from "next/link";
import { PostButton } from "./Buttons";

export default function LeftMenu() {
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link href="/" className="font-semibold text-primary">
        Home
      </Link>
      <Link href="#">Post</Link>
      <Link href="#">Hoge</Link>
      <Link href="#">Fuga</Link>
      <Link href="#">AAA</Link>
      <Link href="#">BBB</Link>
      <PostButton />
    </nav>
  );
}
