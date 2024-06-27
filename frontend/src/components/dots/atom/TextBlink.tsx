import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type PanelProps = {
  text: string;
};
export default function TextBlink({ text }: PanelProps) {
  gsap.registerPlugin(useGSAP);
  const boxRef = useRef(null);

  useGSAP(() => {
    // アニメーションの設定
    gsap.to(boxRef.current, {
      opacity: 0,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="grid place-items-center">
      <p className="text-5xl" ref={boxRef}>
        {text}
      </p>
    </div>
  );
}
