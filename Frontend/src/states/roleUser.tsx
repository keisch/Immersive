import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const isRolUser = atom({
  key: "rol",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
