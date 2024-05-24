import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const isUser = atom({
  key: "user",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
