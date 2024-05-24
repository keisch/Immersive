import { useRecoilState } from "recoil";
import CartProducts from "../cart-products";
import "./styles.scss";
import { cart } from "../../states/cart-state";
import IProduct from "../../models/product/product-interface";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CartContainer() {
  const [cartList, setCartList] = useRecoilState(cart);

  const serializedCart = localStorage.getItem("Cart");
  console.log(serializedCart);
  const getCartData = () => {
    if (serializedCart) {
      const myObject: IProduct[] = JSON.parse(serializedCart);
      setCartList(myObject);
      console.log(myObject);
    } else {
      console.log("No object found in local storage");
    }
  };

  useEffect(() => {
    getCartData();
  }, []);
  const items = cartList.length;

  const totalAmount = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="cart-container">
        <h1 className="cart-container__text">MY CART</h1>
        <p className="cart-container__text--item">TOTAL: {items} ITEM</p>
      </div>
      <ul>
        <li>
          <CartProducts></CartProducts>
        </li>
      </ul>
      <div className="subtotal-container">
        <div className="price-container">
          <p className="price-container__price">Subtotal</p>
          <p className="price-container__price">${totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex justify-center p-4">
        <Link
          to={"/checkout"}
          className="inline-block bg-[#9b4503]  hover:scale-110 text-white py-1 px-3 rounded-full text-xs font-semibold uppercase mr-2"
        >
          CheckOut
        </Link>
      </div>
    </>
  );
}
