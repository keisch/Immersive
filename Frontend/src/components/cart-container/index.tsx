import "./styles.scss";
import { Link } from "react-router-dom";
import ICartItem from "../../models/cart/cart-interface";
import CartProducts from "../cart-products";
import getShoppingCart from "../../utilities/ShoppingCart/getItem";
import { useRecoilState } from "recoil";
import { cart } from "../../states/cart-state";
import deleteItem from "../../utilities/ShoppingCart/deleteItem";
import { useEffect } from "react";
import putRequest from "../../utilities/ShoppingCart/putItem";

export default function CartContainer() {
  const [cartList, setCartList] = useRecoilState(cart);

  useEffect(() => {
    getShoppingCart(setCartList);
  }, []);

  const addItem = (item: ICartItem) => {
    let newQuantity = item.quantity + 1;
    putRequest(item, newQuantity, setCartList);
  };

  const removeItem = (item: ICartItem) => {
    let newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      putRequest(item, newQuantity, setCartList);
    } else {
      deleteItem(item, setCartList);
    }
  };

  const totalItems = cartList.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = cartList.reduce(
    (total, item) => total + item.products.price * item.quantity,
    0
  );

  return (
    <div className="min-h-[100vh]">
      <div className="cart-container">
        <h1 className="cart-container__text">MY CART</h1>
        <p className="cart-container__text--item">TOTAL: {totalItems} ITEMS</p>
      </div>
      <ul>
        <li className="w-full ">
          {cartList.length > 0 ? (
            cartList.map((data, index) => (
              <CartProducts
                key={index}
                item={data}
                addItem={addItem}
                removeItem={removeItem}
              />
            ))
          ) : (
            <div className="min-h-[80vh] flex flex-col  justify-center items-center min-w-full">
              <p className="text-white text-xl font-normal p-8 lg:text-3xl ">
                There are no products in the cart.
              </p>
              <img
                className="w-[100px] sm:w-[200px] md:w-[300px] lg:w-[300px]"
                src="images/errorC.png"
                alt="No product match"
              />
            </div>
          )}
        </li>
      </ul>
      {cartList.length > 0 ? (
        <div>
          <div className="subtotal-container">
            <div className="price-container">
              <p className="price-container__price">Subtotal</p>
              <p className="price-container__price">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex justify-center p-10">
            <Link
              to={"/checkout"}
              className="inline-block bg-[#008248]  hover:scale-110 text-white py-2 px-5 rounded-full text-md font-semibold uppercase mr-2"
            >
              CheckOut
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
