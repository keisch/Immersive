import axios from "axios";
import ICartItem from "../../models/cart/cart-interface";
import URL_LOCAL_BACKEND from "../constant/constants";
import getItem from "./getItem";
import IProduct from "../../models/product/product-interface";

const postRequest = (
  item: IProduct,
  setCartList: (item: ICartItem[]) => void
) => {
  console.log(item.id);
  axios
    .post(
      `${URL_LOCAL_BACKEND}cart`,
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
      getItem(setCartList);
    })
    .catch(function (error) {
      if (error.response == false) {
        console.log("error adding to cart");
      }
    });
};

export default postRequest;
