import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import Link from "next/link";
import type { Entity_Post } from "../../api/@types/";
import { LikeButton } from "./LikeButton";
import { AvatarImage } from "./ui/avatar";

type Props = {
  postedItem: Entity_Post;
  jwtToken: string;
};

export default async function PostedItem({ postedItem, jwtToken }: Props) {
  return (
    <Card className="bg-transparent outline-none border-none">
      <Link href={`posts/${postedItem.id}`} className="hover:no-underline">
        <CardHeader>
          <CardTitle className="nes-balloon from-left">
            {postedItem.title}
          </CardTitle>
        </CardHeader>
      </Link>
      <CardFooter className="flex justify-start gap-x-8">
        <Link
          href={`posts/${postedItem.id}`}
          className="hover:no-underline transion"
        >
          <Avatar>
            <AvatarImage
              src="/img/dots/character/character_kishi_man_01_red_black.svg"
              className="w-14 h-14"
            />
          </Avatar>
        </Link>
        <div className="flex gap-4 items-center">
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
