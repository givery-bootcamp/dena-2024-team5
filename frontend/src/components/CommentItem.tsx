import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { dateFormatString2DateJa } from "@/utils/date";
import { cookies } from "next/headers";
import type { Entity_Comment } from "../../api/@types";
import { CommentDeleteDialog } from "./deleteCommentDialog";

export async function CommentItem({
  comment,
}: {
  comment: Entity_Comment;
}) {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  return (
    <Card className="w-full">
      <CardContent>
        <CardDescription className="">{comment.body}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm">{comment.user_id}</p>
        <p className="text-sm">{dateFormatString2DateJa(comment.created_at)}</p>
        <CommentDeleteDialog commentId={comment.id} jwtToken={jwtToken} />
      </CardFooter>
    </Card>
  );
}
