import axios from "axios";
import ICartItem from "../../models/cart/cart-interface";
import URL_LOCAL_BACKEND from "../constant/constants";
import getWishList from "./getWishLisrItem";

const deleteWishListItem = (
  setWishList: (item: ICartItem[]) => void,
  item: number
) => {
  if (item) {
    axios
      .delete(`${URL_LOCAL_BACKEND}wishList?product=${item}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function () {
        getWishList(setWishList);
      })
      .catch(function (error) {
        console.log("Error deleting item from cart", error);
      });
  }
};
export default deleteWishListItem;
