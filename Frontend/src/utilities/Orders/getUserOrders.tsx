import axios from "axios";
import URL_LOCAL_BACKEND from "../constant/constants";
import IOrder from "../../models/orders/orders-interface";

const getUserOrder = (setOrderList: (item: IOrder[]) => void) => {
  axios
    .get(`${URL_LOCAL_BACKEND}order`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      setOrderList(response.data);
    })
    .catch(function (error) {
      if (error.response) {
      }
    });
};
export default getUserOrder;
