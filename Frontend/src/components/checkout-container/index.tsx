import { useRecoilState } from "recoil";
import "./styles.scss";
import { cart } from "../../states/cart-state";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CheckOutForm from "../checkout-form";
import CheckOutProducts from "../checkout-products";
import { Tooltip } from "react-tooltip";

export default function CheckOutContainer() {
  const [cartList] = useRecoilState(cart);
  const navigate = useNavigate();

  console.log(cartList);

  // useEffect(() => {
  //   const serializedCart = localStorage.getItem("Cart");
  //   if (!cartList.length && serializedCart) {
  //     const myObject: IProduct[] = JSON.parse(serializedCart);
  //     setCartList(myObject);
  //   } else {
  //     console.log("No object found in local storage or cart already populated");
  //   }
  // }, [cartList, setCartList]);

  const totalItems = cartList.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = cartList.reduce(
    (total, item) => total + item.products.price * item.quantity,
    0
  );

  return (
    <>
      <div className="checkout-container">
        <h1 className="checkout-container__text">CHECKOUT</h1>
        <p className="checkout-container__text--item">
          TOTAL: {totalItems} ITEM
        </p>
      </div>
      <div className="display flex flex-col sm:flex-row">
        <ul className="sm:w-[50%]">
          <li className="w-full">
            {cartList.length > 0 ? (
              cartList.map((data, index) => (
                <div>
                  <CheckOutProducts key={index} item={data} />
                  <Tooltip
                    id={data.products.name}
                    className="md:hidden"
                    place="top"
                  />
                </div>
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
        <div className="flex flex-col sm:pb-2 sm:w-[50%] sm:justify-end">
          <div className="checkout-subtotal-container">
            <div className="checkout-price-container">
              <p className="checkout-price-container__price">Subtotal</p>
              <p className="checkout-price-container__price">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="checkout-price-container">
              <p className="checkout-price-container__price">Taxes</p>
              <p className="checkout-price-container__price">
                ${(totalAmount * 0.1).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="checkout-total-container">
            <p className="checkout-total-container__total">Total</p>
            <p className="checkout-total-container__total">
              ${(totalAmount + totalAmount * 0.1).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <CheckOutForm></CheckOutForm>
    </>
  );
}
