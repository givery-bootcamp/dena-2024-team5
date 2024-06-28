'use client';
import { useAtom } from "jotai";
import { isAudioOnAtom } from "@/lib/atom";
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });


export const ClientAudio =  ({src}:{src:string}) => {
    const [isAudioOn] = useAtom(isAudioOnAtom);
    return(
        <ReactPlayer url={src} playing={isAudioOn}></ReactPlayer>
    )
}

export function audioOn() {
    const [_, setIsAudioOn] = useAtom(isAudioOnAtom);
    // const [isAudioOn] = useAtom(isAudioOnAtom);    
    setIsAudioOn(true);
}
