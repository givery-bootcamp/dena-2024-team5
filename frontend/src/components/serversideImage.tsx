"use server";
import Image from "next/image";

type PanelProps = {
  imgPath: string;
};

export default function serversideImage({ imgPath }: PanelProps) {
  return (
    <Image src={imgPath} width={50} height={50} alt="image" className="image" />
  );
}
