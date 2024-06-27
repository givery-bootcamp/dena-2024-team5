import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

type PanelProps = {
  imgPath: string;
};
export default function ImgWithLeft2RightMotion({ imgPath }: PanelProps) {
  gsap.registerPlugin(useGSAP);
  const boxRef = useRef(null);

  useGSAP(() => {
    // アニメーションの設定
    gsap.to(boxRef.current, {
      x: 80,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <Image
      ref={boxRef}
      src={imgPath}
      width={100}
      height={100}
      alt="character"
    />
  );
}
