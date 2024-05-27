import type { PostedItemType } from "@/types/PostedItemType";
import Link from "next/link";

export default async function PostedItem({
	postedItem,
}: { postedItem: PostedItemType }) {
	return (
		<div>
			<Link href={"#"}>{postedItem.Title}</Link>
			<div>{postedItem.UserName}</div>
			<div>{postedItem.UpdatedAt.toLocaleString("ja")}</div>
		</div>
	);
}
