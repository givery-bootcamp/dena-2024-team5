import Link from "next/link";
import { PostedItemType } from "@/types/PostedItemType";

export default async function PostedItem({postedItem}:{postedItem:PostedItemType}) {

    return (
        <div>
        <Link href={"#"}>{postedItem.Title}</Link>
        {postedItem.UpdatedAt.toLocaleDateString()}
        </div>
    );
  }
  