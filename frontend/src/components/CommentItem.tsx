import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { dateFormatString2DateJa } from "@/utils/date";
import Link from "next/link";

export type Entities_Comment = {
  body: string;
  created_at: string;
  id: number;
  updated_at: string;
  user_id: number;
  username: string;
};

export const comment_Example: Entities_Comment = {
  body: "コメント",
  created_at: "2024-06-24T07:42:32.595Z",
  id: 1,
  updated_at: "2024-06-24T07:42:32.595Z",
  user_id: 1,
  username: "test太郎",
};

export async function CommentItem({
  comment,
}: {
  comment: Entities_Comment;
}) {
  return (
    <Card className="w-full">
      <CardContent>
        <CardDescription className="">{comment.body}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm">{comment.username}</p>
        <p className="text-sm">{dateFormatString2DateJa(comment.created_at)}</p>
        <Button asChild>
          <Link href={`posts/${comment.id}`}>詳細</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
