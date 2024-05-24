import { useRecoilState } from "recoil";
import { cart } from "../../states/cart-state";
import { useEffect } from "react";
import IProduct from "../../models/product/product-interface";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function CartProducts() {
  const [cartList, setCartList] = useRecoilState(cart);

  const serializedCart = localStorage.getItem("Cart");
  const getCartData = () => {
    if (serializedCart) {
      const myObject: IProduct[] = JSON.parse(serializedCart);
      setCartList(myObject);
      console.log(myObject);
    } else {
      console.log("No object found in local storage");
    }
  };

  const addProduct = (element: number) => {
    if (element) {
      setCartList((prevCartList: IProduct[]) =>
        prevCartList.map((cartProduct) => {
          if (cartProduct.id == element) {
            return { ...cartProduct, quantity: cartProduct.quantity + 1 };
          } else {
            return cartProduct;
          }
        })
      );
    }
  };

  const removeProduct = (element: number) => {
    if (element) {
      setCartList((prevCartList: IProduct[]) =>
        prevCartList
          .map((cartProduct) => {
            if (cartProduct.id == element) {
              const newQuantity = cartProduct.quantity - 1;
              return { ...cartProduct, quantity: newQuantity };
            } else {
              return cartProduct;
            }
          })
          .filter((cartProduct) => cartProduct.quantity > 0)
      );
    }
  };
  const deleteProduct = (element: number) => {
    if (element) {
      setCartList((prevCartList: IProduct[]) =>
        prevCartList.filter((cartProduct) => cartProduct.id !== element)
      );
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
              <div className="buttons-container">
                <button
                  className="buttons-container__btn"
                  onClick={() => removeProduct(element.id)}
                >
                  -
                </button>
                <p className="buttons-container__quantity">
                  {element.quantity}
                </p>
                <button
                  className="buttons-container__btn"
                  onClick={() => addProduct(element.id)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="trash-container">
              <FontAwesomeIcon
                className="trash-container__img"
                icon={faTrashCan}
                onClick={() => deleteProduct(element.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
