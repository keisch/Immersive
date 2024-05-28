import IOrder from "../../models/orders/orders-interface";

interface OrderProps {
  item: IOrder;
}
const OrderElements: React.FC<OrderProps> = ({ item }) => {
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

  return (
    <div className="max-w-[100%] m-2 p-3 md:mx-10 rounded-lg overflow-hidden flex flex-col">
      <div className="flex justify-between items-center pb-2">
        <h2 className="font-bold text-lg text-white w-[50%]">
          Order: {item.id}
        </h2>
        <h2
          className={`font-bold text-end sm:text-end text-md w-[50%] ${getStatusColor(
            item.state.name
          )}`}
        >
          Status: {item.state.name}
        </h2>
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
export default OrderElements;
