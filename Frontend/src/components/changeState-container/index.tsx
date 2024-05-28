import { useEffect, useState } from "react";
import IOrder from "../../models/orders/orders-interface";
import getAllOrders from "../../utilities/Orders/getAllOrders";
import ChangeState from "../change-state";

export default function ChangeOrderState() {
  const [orderList, setOrderList] = useState<IOrder[]>([]);

  useEffect(() => {
    getAllOrders(setOrderList);
  }, []);

  return (
    <div className="min-h-[100vh]">
      <div className="checkout-container">
        <h1 className="checkout-container__text">ORDER RECORD</h1>
        <p className="checkout-container__text--item">
          {orderList?.length} Orders
        </p>
      </div>
      <ul>
        <li className="w-full">
          {orderList.length > 0 ? (
            orderList.map((data, index) => (
              <ChangeState key={index} item={data} />
            ))
          ) : (
            <div className="flex flex-col  justify-center items-center ">
              <p className="text-white text-xl font-normal p-8">
                There are no products in the WishList.
              </p>
              <img
                className="w-[120px]"
                src="images/errorC.png"
                alt="No product match"
              />
            </div>
          )}
        </li>
      </ul>
      <div className="flex justify-center p-4">
        <button
          className="inline-block bg-[#008248] mt-4 hover:scale-110 text-white mb-6 py-2 px-5 rounded-full text-sm font-semibold uppercase mr-2"
          aria-label="Change Status"
          type="submit"
          onClick={() => getAllOrders(setOrderList)}
        >
          Change status
        </button>
      </div>
    </div>
  );
}
