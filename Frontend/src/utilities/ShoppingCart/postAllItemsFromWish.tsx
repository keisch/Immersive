import axios from "axios";
import ICartItem from "../../models/cart/cart-interface";
import URL_LOCAL_BACKEND from "../constant/constants";
import getItem from "./getItem";
import getWishList from "../WishList/getWishLisrItem";

const postAllRequestFromWish = (
  setCartList: (item: ICartItem[]) => void,
  setWishList: (wishItem: ICartItem[]) => void
) => {
  axios
    .post(`${URL_LOCAL_BACKEND}cart/allFromWish`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      getItem(setCartList);
      getWishList(setWishList);
    })
    .catch(function (error) {
      if (error.response == false) {
        console.log("error adding to cart");
      }
    });
};

export default postAllRequestFromWish;
