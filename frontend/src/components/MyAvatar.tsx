import type { Session } from "next-auth";
import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  session: Session;
};

export const MyAvatar = ({ session }: Props) => {
  return (
    <div className="grid items-center">
      <Avatar className="w-24 h-24 items-center">
        <AvatarImage
          src="/img/dots/character/character_kishi_man_01_red_black.svg"
          alt="avatar"
        />
      </Avatar>
      <p className="text-4xl font-bold text-center">{session.user.username}</p>
    </div>
  );
};
