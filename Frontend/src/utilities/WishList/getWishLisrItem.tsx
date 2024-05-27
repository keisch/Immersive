import axios from "axios";
import URL_LOCAL_BACKEND from "../constant/constants";
import ICartItem from "../../models/cart/cart-interface";

const getWishList = (setWishList: (item: ICartItem[]) => void) => {
  axios
    .get(`${URL_LOCAL_BACKEND}wishList`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      setWishList(response.data);
    })
    .catch(function (error) {
      if (error.response) {
      }
    });
};
export default getWishList;
