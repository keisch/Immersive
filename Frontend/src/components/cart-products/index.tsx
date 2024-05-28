import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ICartItem from "../../models/cart/cart-interface";
import deleteItem from "../../utilities/ShoppingCart/deleteItem";
import { useRecoilState } from "recoil";
import { cart } from "../../states/cart-state";

interface CartProductsProps {
  item: ICartItem;
  addItem: (item: ICartItem) => void;
  removeItem: (item: ICartItem) => void;
}

const CartProducts: React.FC<CartProductsProps> = ({
  item,
  addItem,
  removeItem,
}) => {
  const [, setCartList] = useRecoilState(cart);

  return (
    <div className="bg-[#34373a] max-w-[100%] m-4 md:mx-10 rounded-lg overflow-hidden shadow-lg flex flex-col sm:flex-row">
      <img
        className="m-2 rounded-lg sm:h-[200px] sm:w-[200px] object-cover"
        src={item.products.img}
        alt="Product Image Cart"
      />
      <div className="w-full px-4 py-2 flex flex-col justify-between min-h-36">
        <div className="flex flex-col justify-center pl-2.5 h-25">
          <h2 className="text-white text-2xl font-semibold font-[Open Sans]">
            {item.products.name}
          </h2>
          <h3 className="hidden  text-lg text-[#b2b0b0] sm:block">
            {item.products.summary}
          </h3>
          <h3 className="font-bold text-lg text-[#00d878]">
            ${(item.products.price * item.quantity).toFixed(2)}
          </h3>
          <div className="flex items-center">
            <button
              className="pr-[10px] pl-[10px] pb-[2px] bg-[#212325] text-white rounded-[10px]"
              onClick={() => removeItem(item)}
            >
              -
            </button>
            <p className="text-white p-2">{item.quantity}</p>
            <button
              className="pr-[10px] pl-[10px] pb-[2px] bg-[#212325] text-white rounded-[10px]"
              onClick={() => addItem(item)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex w-auto text-right justify-end">
          <FontAwesomeIcon
            className="text-white bg-[#008248] p-2 rounded-lg text-lg cursor-pointer"
            icon={faTrashCan}
            onClick={() => deleteItem(item, setCartList)}
          />
        </div>
      </div>
    </div>
  );
};
export default CartProducts;
