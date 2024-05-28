import axios from "axios";
import ICartItem from "../../models/cart/cart-interface";
import URL_LOCAL_BACKEND from "../constant/constants";
import getWishList from "./getWishLisrItem";

const putWishListRequest = (
  item: ICartItem,
  newQuantity: number,
  setWishList: (item: ICartItem[]) => void
) => {
  axios
    .put(
      `${URL_LOCAL_BACKEND}wishList`,
      {
        products: item.products.id,
        quantity: newQuantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(function () {
      getWishList(setWishList);
    })
    .catch(function (error) {
      if (error.response == false) {
        console.log("error adding to cart");
      }
    });
};

export default putWishListRequest;
