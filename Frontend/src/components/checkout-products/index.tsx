import { useRecoilState } from "recoil";
import { cart } from "../../states/cart-state";
import { useEffect } from "react";
import IProduct from "../../models/product/product-interface";
import "./styles.scss";

export default function CheckOutProducts() {
  const [cartList, setCartList] = useRecoilState(cart);

  const serializedCart = localStorage.getItem("cart");
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
  return (
    <>
      {cartList.map((element: IProduct) => (
        <div className="product-container">
          <img
            className="product-container__img"
            src={element.image}
            alt="Product Image Cart"
          />
          <div className="product-data-container">
            <div className="product-data">
              <h2 className="product-data__name">{element.name}</h2>
              <h3 className="product-data__price">
                ${(element.price * element.quantity).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
