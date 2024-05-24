import toast, { Toaster } from "react-hot-toast";
import IProduct from "../../models/product/product-interface";
import NotFound from "../not-found";

import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { cart } from "../../states/cart-state";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  product?: IProduct;
}
export default function ProductDetailsComponent({ product }: IProps) {
  if (!product) {
    return <NotFound></NotFound>;
  }

  // buscar como hacerlo mejor

  const [cartList, setCartList] = useRecoilState(cart);
  // prettier-ignore
  const addToCart = (element: IProduct) => {
    if (cartList.length == 0 || cartList.every((elementInCart: IProduct) => element.id != elementInCart.id)==true) {
      setCartList([...cartList, element]);
    }
    addProduct(element.id)
  };

  const notification = () => {
    toast("Item added to cart", {
      icon: <FontAwesomeIcon className="text-[#008248]" icon={faCartPlus} />,
    });
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
    notification();
  };

  return (
    <div id="product-details" className="product-details">
      <img
        src={product.image}
        alt="Product Details"
        className="product-details__img"
      />
      <ul className="product-details__ul">
        <li className="product-details__li">
          <p className="product-details__li--category">{product.category}</p>
        </li>
        <li>
          <p className="product-details__ul--name">{product.name}</p>
        </li>
        <li>
          <p className="product-details__ul--price">Price: ${product.price}</p>
        </li>
        <li>
          <p className="product-details__ul--description">{product.summary}</p>
        </li>
        <li>
          <button
            className="inline-block mb-[50px] bg-[#008248] hover:scale-110 text-white py-1 px-3 rounded-full text-xs font-semibold uppercase"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </li>
      </ul>
      <div>
        <Toaster position="bottom-left" />
      </div>
    </div>
  );
}
