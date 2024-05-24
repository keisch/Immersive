import { useRecoilState } from "recoil";
import "./styles.scss";
import { cart } from "../../states/cart-state";
import IProduct from "../../models/product/product-interface";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CheckOutProducts from "../checkout-products";
import CheckOutForm from "../checkout-form";

export default function CheckOutContainer() {
  const [cartList, setCartList] = useRecoilState(cart);
  const navigate = useNavigate();

  const notification = () => {
    toast.success("Thank you for your purchase");
    setTimeout(() => {
      navigate("/");
    }, 2000); // 2000 milisegundos = 2 segundos
  };

  useEffect(() => {
    const serializedCart = localStorage.getItem("Cart");
    if (!cartList.length && serializedCart) {
      const myObject: IProduct[] = JSON.parse(serializedCart);
      setCartList(myObject);
    } else {
      console.log("No object found in local storage or cart already populated");
    }
  }, [cartList, setCartList]);

  const items = cartList.length;

  const totalAmount = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="cart-container">
        <h1 className="cart-container__text">CHECKOUT</h1>
        <p className="cart-container__text--item">TOTAL: {items} ITEM</p>
      </div>
      <ul>
        <li>
          <CheckOutProducts></CheckOutProducts>
        </li>
      </ul>
      <div className="subtotal-container">
        <div className="price-container">
          <p className="price-container__price">Subtotal</p>
          <p className="price-container__price">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="price-container">
          <p className="price-container__price">Taxes</p>
          <p className="price-container__price">
            ${(totalAmount * 0.1).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="total-container">
        <p className="total-container__total">Total</p>
        <p className="total-container__total">
          ${(totalAmount + totalAmount * 0.1).toFixed(2)}
        </p>
      </div>
      <CheckOutForm></CheckOutForm>
      <div className="flex justify-center p-4">
        <button
          onClick={() => notification()}
          className="inline-block bg-[#9b4503]  hover:scale-110 text-white py-1 px-3 rounded-full text-xs font-semibold uppercase mr-2"
        >
          Complete purchase
        </button>
      </div>
    </>
  );
}
