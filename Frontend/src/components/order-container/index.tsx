import { useEffect, useState } from "react";
import getUserOrder from "../../utilities/Orders/getUserOrders";
import IOrder from "../../models/orders/orders-interface";
import OrderElements from "../order-elements";

export default function OrderContainer() {
  const [orderList, setOrderList] = useState<IOrder[]>([]);

  useEffect(() => {
    getUserOrder(setOrderList);
  }, []);

  return (
    <div className="min-h-[100vh]">
      <div className="checkout-container">
        <h1 className="checkout-container__text">ORDER HISTORY</h1>
        <p className="checkout-container__text--item">
          {orderList?.length} Orders
        </p>
      </div>
      <ul>
        <li className="w-full">
          {orderList.length > 0 ? (
            orderList.map((data, index) => (
              <OrderElements key={index} item={data} />
            ))
          ) : (
            <div className="flex flex-col  justify-center items-center ">
              <p className="text-white text-xl font-normal p-8">
                There are no orders yet.
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
    </div>
  );
}
