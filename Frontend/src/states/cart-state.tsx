import { atom } from "recoil";
import ICartItem from "../models/cart/cart-interface";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cart = atom<ICartItem[]>({
  key: "cart",
  default: [] as ICartItem[],
  effects_UNSTABLE: [persistAtom],
});
