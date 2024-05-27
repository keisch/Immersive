import { atom } from "recoil";
import ICartItem from "../models/cart/cart-interface";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const wish = atom<ICartItem[]>({
  key: "wish",
  default: [] as ICartItem[],
  effects_UNSTABLE: [persistAtom],
});
