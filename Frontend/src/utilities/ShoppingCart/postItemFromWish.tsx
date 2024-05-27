import axios from "axios";
import ICartItem from "../../models/cart/cart-interface";
import URL_LOCAL_BACKEND from "../constant/constants";
import getItem from "./getItem";
import IProduct from "../../models/product/product-interface";

const postRequestFromWish = (
  item: IProduct,
  quantity: number,
  setCartList: (item: ICartItem[]) => void
) => {
  console.log(item.id);
  axios
    .post(
      `${URL_LOCAL_BACKEND}cart/fromWish`,
      {
        products: item.id,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then(function (response) {
      getItem(setCartList);
    })
    .catch(function (error) {
      if (error.response == false) {
        console.log("error adding to cart");
      }
    });
};

export default postRequestFromWish;
