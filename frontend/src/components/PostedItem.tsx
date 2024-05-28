import type { PostedItemType } from "@/types/PostedItemType";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function PostedItem({
  postedItem,
}: {
  postedItem: PostedItemType;
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
        <p className="text-sm">{postedItem.updated_at.toLocaleString("ja")}</p>
        <Button asChild>
          <Link href={`posts/${postedItem.id}`}>詳細</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
