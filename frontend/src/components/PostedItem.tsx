import type { PostedItemType } from "@/types/PostedItemType";
import Link from "next/link";

export default async function PostedItem({
  postedItem,
}: { postedItem: PostedItemType }) {
  return (
    <div>
      <Link href={"#"}>{postedItem.title}</Link>
      <div>{postedItem.username}</div>
      <div>{postedItem.updated_at.toLocaleString("ja")}</div>
    </div>
  );
}
