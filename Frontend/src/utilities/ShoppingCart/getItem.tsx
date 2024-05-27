import axios from "axios";
import URL_LOCAL_BACKEND from "../constant/constants";
import ICartItem from "../../models/cart/cart-interface";

const getShoppingCart = (setCartList: (item: ICartItem[]) => void) => {
  axios
    .get(`${URL_LOCAL_BACKEND}cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      setCartList(response.data);
    })
    .catch(function (error) {
      if (error.response) {
      }
    });
};
export default getShoppingCart;
