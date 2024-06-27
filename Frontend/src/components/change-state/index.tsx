import { ChangeEvent, useEffect, useState } from "react";
import IOrder from "../../models/orders/orders-interface";
import axios from "axios";
import getAllOrders from "../../utilities/Orders/getAllOrders";

interface OrderProps {
  item: IOrder;
}

const ChangeState: React.FC<OrderProps> = ({ item }) => {
  const [stateId, setStateId] = useState<number | undefined>(undefined);
  const [orderList, setOrderList] = useState<IOrder[]>([]);

  const getStatusColor = (status: String) => {
    switch (status) {
      case "PENDING":
        return "text-[#f1e561]";
      case "COMPLETED":
        return "text-[#00d878]";
      case "CANCELLED":
        return "text-[#f16172]";
      default:
        return "text-[#00d878]";
    }
  };

  useEffect(() => {
    setStateId(item.state.id);
  }, []);

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newStateId = parseInt(e.target.value);
    setStateId(newStateId);

    axios
      .put(
        "http://localhost:8080/order",
        {
          orderFormId: item.id,
          stateId: newStateId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function () {
        getAllOrders(setOrderList);
      })
      .catch(function (error) {
        if (error.response == false) {
          console.log("error changing state");
        }
      });
  };

  return (
    <div className="max-w-[100%] m-2 p-3 md:mx-10 rounded-lg overflow-hidden flex flex-col">
      <div className="flex justify-between items-center pb-2">
        <h2 className="font-bold text-lg text-white w-[50%]">
          Order: {item.id}
        </h2>
        <div className="flex flex-col items-center sm:items-end w-[50%]">
          <h2
            className={`font-bold text-center sm:text-end text-md w-full ${getStatusColor(
              item.state.name
            )}`}
          >
            Status: {item.state.name}
          </h2>
          <select
            className="font-bold text-center bg-[#6e6e6e] text-md w-[120px] text-sm text-white rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
            aria-label="Select state"
            // value={stateId !== undefined ? stateId : ""}
            value={stateId !== undefined ? stateId : ""}
            onChange={handleStateChange}
          >
            <option value={1}>PENDING</option>
            <option value={2}>COMPLETED</option>
            <option value={3}>CANCELLED</option>
          </select>
        </div>
      </div>
      <div className="bg-[#34373a] max-w-[100%] p-3 rounded-lg overflow-hidden flex flex-col md:flex-row ">
        <div className="flex flex-col justify-between items-start sm:flex-row md:w-[50%] sm:items-center">
          <h3 className="font-bold text-md text-gray-400 sm:w-[50%]">
            Email:
            <span className="font-semibold text-sm text-gray-400">
              {" "}
              {item.email}
            </span>
          </h3>
          <h3 className="font-bold text-md text-gray-400 pt-4 sm:text-end sm:pt-0 sm:w-[50%] md:text-center">
            Date:
            <span className="font-semibold text-sm text-gray-400">
              {" "}
              {item.date}
            </span>
          </h3>
        </div>
        <div className="flex flex-col justify-between items-start pt-4 md:pt-0 md:w-[50%] sm:flex-row sm:items-center">
          <h3 className="font-bold text-md text-gray-400 sm:w-[50%] md:text-center">
            City:
            <span className="font-semibold text-sm text-gray-400">
              {" "}
              {item.city}
            </span>
          </h3>
          <h3 className="font-bold text-md text-gray-400 pt-4 sm:text-end sm:pt-0 sm:w-[50%] md:text-end">
            Province:
            <span className="font-semibold text-sm text-gray-400">
              {" "}
              {item.province}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ChangeState;
