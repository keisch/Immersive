import { Link } from "react-router-dom";
import IProduct from "../../models/product/product-interface";
import { useRecoilState } from "recoil";
import { cart } from "../../states/cart-state";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  // Add to cart
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

  useEffect(() => {
    const serializedCart = JSON.stringify(cartList);
    localStorage.setItem("Cart", serializedCart);
  }, [cartList]);

  return (
    <div>
      <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-[0.3s] ease-in-out hover:scale-[1.05] hover:rounded-md hover:shadow-md hover:border hover:border-gray-400">
        <Link to={`/products/${product.id}`}>
          <img
            className="w-full sm:h-[348px]"
            src={product.img}
            alt="product image"
          />
        </Link>
        <div className="px-4 py-2 flex flex-col justify-between min-h-36 bg-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h2>
            <h3 className="text-sm min-h-[40px] text-gray-700">
              {product.summary}
            </h3>
          </div>
          <div className="flex justify-between items-center mt-2 flex-col md:flex-row pb-3.5">
            <span className="text-lg pb-3.5 font-bold text-gray-900 sm:pb-2 md:pb-0">
              ${product.price}
            </span>
            <div className="flex">
              <Link
                to={`/products/${product.id}`}
                className="inline-block bg-gray-200 hover:scale-110 text-gray-800 py-1 px-3 rounded-full text-xs font-semibold uppercase mr-2"
              >
                Details
              </Link>
              <button
                className="inline-block bg-[#008248] hover:scale-110 text-white py-1 px-3 rounded-full text-xs font-semibold uppercase"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-left" />
    </div>
  );
};

export default ProductCard;
