"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { dateFormatString2DateJa } from "@/utils/date";
import type { Entity_Comment } from "../../api/@types";

export const comment_Example: Entity_Comment = {
  body: "コメント",
  created_at: "2024-06-24T07:42:32.595Z",
  id: 1,
  post_id: 1,
  updated_at: "2024-06-24T07:42:32.595Z",
  user_id: 1,
};

export async function CommentItem({
  comment,
}: {
  comment: Entity_Comment;
}) {
  return (
    <Card className="w-full">
      <CardContent>
        <CardDescription className="">{comment.body}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm">{comment.user_id}</p>
        <p className="text-sm">{dateFormatString2DateJa(comment.created_at)}</p>
        <Button onClick={() => console.log("削除ボタン")}>
          削除
          {/* <Link href={`posts/${comment.id}`}>削除</Link> */}
        </Button>
      </CardFooter>
    </Card>
  );
}
