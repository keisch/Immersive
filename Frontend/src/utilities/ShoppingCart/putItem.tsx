import axios from "axios";
import ICartItem from "../../models/cart/cart-interface";
import URL_LOCAL_BACKEND from "../constant/constants";
import getItem from "./getItem";

const putRequest = (
  item: ICartItem,
  newQuantity: number,
  setCartList: (item: ICartItem[]) => void
) => {
  axios
    .put(
      `${URL_LOCAL_BACKEND}cart`,
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
    .then(function (response) {
      console.log(newQuantity);
      getItem(setCartList);
    })
    .catch(function (error) {
      if (error.response == false) {
        console.log("error adding to cart");
      }
    });
};

export default putRequest;
