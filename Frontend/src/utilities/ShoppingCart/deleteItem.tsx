import axios from "axios";
import ICartItem from "../../models/cart/cart-interface";
import URL_LOCAL_BACKEND from "../constant/constants";
import getItem from "./getItem";

const deleteItem = (
  item: ICartItem,
  setCartList: (item: ICartItem[]) => void
) => {
  axios
    .delete(`${URL_LOCAL_BACKEND}cart?product=${item.products.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function () {
      getItem(setCartList);
    })
    .catch(function (error) {
      console.log("Error deleting item from cart", error);
    });
};
export default deleteItem;
