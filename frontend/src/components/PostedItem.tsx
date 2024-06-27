import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dateFormatString2DateJa } from "@/utils/date";
import Link from "next/link";
import type { Entity_Post } from "../../api/@types/";

export default async function PostedItem({
  postedItem,
}: {
  postedItem: Entity_Post;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{postedItem.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="">{postedItem.body}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm">{postedItem.username}</p>
        <p className="text-sm">
          {dateFormatString2DateJa(postedItem.created_at)}
        </p>
        <Button variant="nesPrimary" asChild>
          <Link href={`posts/${postedItem.id}`}>詳細</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
