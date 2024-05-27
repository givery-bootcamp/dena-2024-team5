import type { PostedItemType } from "@/types/PostedItemType";
import Link from "next/link";

export default async function PostedItem({
	postedItem,
}: { postedItem: PostedItemType }) {
	return (
		<div>
			<Link href={"#"}>{postedItem.Title}</Link>
			{postedItem.UpdatedAt.toLocaleDateString()}
		</div>
	);
}
