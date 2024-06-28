import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const isEditModeAtom = atom(false);

// export const isCommentEditModeAtom = atom(false);
export const isCommentEditModeAtom = atomFamily((commentId) => atom(false));

export const isAudioOnAtom = atom(true);
