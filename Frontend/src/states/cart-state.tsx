import { atom } from "recoil";
import IProduct from "../models/product/product-interface";

export const cart = atom({
  key: "cart",
  default: [] as IProduct[],
});
