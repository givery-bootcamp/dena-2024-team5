"use client";
import { useEffect } from "react";
type PanelProps = {
  text: string;
};

export default function KirakiraConsole({ text }: PanelProps) {
  useEffect(() => {
    // console.logの結果をおしゃれに出すスタイル
    const style =
      "border-radius:4px;border:2px dotted pink;margin:0.25rem;padding:1.5rem 1rem;font-family:'Kiwi Maru';text-shadow: #FC0 1px 0 10px;";
    console.log(`%cTeam5 Products 「${text}」`, style);
  });
  return <> </>;
}
