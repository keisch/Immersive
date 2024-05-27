import axios from "axios";
import ICartItem from "../../models/cart/cart-interface";
import URL_LOCAL_BACKEND from "../constant/constants";
import IProduct from "../../models/product/product-interface";
import getWishList from "./getWishLisrItem";

const postWishListRequest = (
  item: IProduct,
  setWishList: (item: ICartItem[]) => void
) => {
  console.log(item.id);
  axios
    .post(
      `${URL_LOCAL_BACKEND}wishList`,
      {
        products: item.id,
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

export default postWishListRequest;
