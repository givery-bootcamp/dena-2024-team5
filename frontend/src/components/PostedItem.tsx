import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormatString2DateJa } from "@/utils/date";
import Link from "next/link";
import type { Entity_Post } from "../../api/@types/";
import { LikeButton } from "./LikeButton";

type Props = {
  postedItem: Entity_Post;
  jwtToken: string;
};

export default async function PostedItem({ postedItem, jwtToken }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{postedItem.title}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <p className="text-sm">{postedItem.username}</p>
        <p className="text-sm">
          {dateFormatString2DateJa(postedItem.created_at)}
        </p>
        <div className="flex gap-4 items-center">
          <Button variant="nesPrimary" asChild>
            <Link href={`posts/${postedItem.id}`}>詳細</Link>
          </Button>
          <LikeButton
            postId={postedItem.id}
            likeCount={postedItem.like_count}
            jwtToken={jwtToken}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
