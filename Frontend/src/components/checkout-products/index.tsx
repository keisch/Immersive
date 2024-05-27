import "./styles.scss";
import ICartItem from "../../models/cart/cart-interface";

interface CartProductsProps {
  item: ICartItem;
}
const CheckOutProducts: React.FC<CartProductsProps> = ({ item }) => {
  return (
    <div className="bg-[#34373a] max-w-[100%] m-4 p-3 md:mx-10 rounded-lg overflow-hidden shadow-lg flex justify-between items-center">
      <p className="text-white text-sm font-bold py-1 px-3 bg-[#212325] rounded-lg">
        {item.quantity}
      </p>
      <div className="relative flex-1 mx-3 overflow-hidden">
        <a
          className="text-white text-md font-semibold font-[Open Sans] truncate ... block"
          data-tooltip-id={item.products.name}
          data-tooltip-content={item.products.name}
        >
          {item.products.name}
        </a>
      </div>
      <h2 className="font-bold text-md text-[#00d878]">
        ${(item.products.price * item.quantity).toFixed(2)}
      </h2>
    </div>
  );
};
export default CheckOutProducts;
