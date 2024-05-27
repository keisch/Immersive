import { Link } from "react-router-dom";
import IProduct from "../../models/product/product-interface";
import { useRecoilState } from "recoil";
import { cart } from "../../states/cart-state";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import putItem from "../../utilities/ShoppingCart/putItem";
import postItem from "../../utilities/ShoppingCart/postItem";
import { wish } from "../../states/wish-state";
import { useEffect, useState } from "react";
import putWishListRequest from "../../utilities/WishList/putWishListItem";
import postWishListRequest from "../../utilities/WishList/postWishListItem";
import deleteWishListItem from "../../utilities/WishList/deleteWishListItem";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const [cartList, setCartList] = useRecoilState(cart);
  const [wishList, setWishList] = useRecoilState(wish);
  const [isInWishList, setIsInWishList] = useState<boolean>(false);

  // prettier-ignore
  const addToCart = (element : IProduct) => {
    const existingItem = cartList.find(item => item.products.id === element.id);
    if (existingItem){
      putItem(existingItem, existingItem.quantity+1 ,setCartList)
    }
    else{
      postItem(element,setCartList)
    }
    notification()
  }

  const addWishList = (element: IProduct) => {
    postWishListRequest(element, setWishList);
    setIsInWishList(true);
  };

  const removeFromWishList = (element: IProduct) => {
    deleteWishListItem(setWishList, element.id);
    setIsInWishList(false);
  };

  const notification = () => {
    toast("Item added to cart", {
      icon: <FontAwesomeIcon className="text-[#008248]" icon={faCartPlus} />,
    });
  };

  useEffect(() => {
    const isInList = wishList.some(
      (element) => element.products.id === product.id
    );
    setIsInWishList(isInList);
  }, [wishList, product.id]);

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full sm:max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-[0.3s] ease-in-out hover:scale-[1.05] hover:rounded-md hover:shadow-md hover:border hover:border-gray-400 relative group">
        <div className="relative">
          <div className="relative">
            {!isInWishList ? (
              <button
                className="absolute top-0 right-0 pl-2 pr-3 pt-3 pb-2 z-10 hover:scale-125 transition-transform duration-300"
                onClick={() => addWishList(product)}
              >
                <FontAwesomeIcon
                  icon={regularHeart}
                  className="text-xl text-[#008248]"
                />
              </button>
            ) : (
              <button
                className="absolute top-0 right-0 pl-2 pr-3 pt-3 pb-2 z-10 hover:scale-125 transition-transform duration-300"
                onClick={() => removeFromWishList(product)}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-xl text-[#008248]"
                />
              </button>
            )}
            <Link to={`/products/${product.id}`}>
              <img
                className="w-full sm:h-[348px]"
                src={product.img}
                alt="product image"
              />
            </Link>
          </div>
          <div className="absolute bottom-0 w-full bg-[#34373a] bg-opacity-95 text-white px-4 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
            <h2 className="text-sm">{product.summary}</h2>
          </div>
        </div>
        <div className="px-4 py-2 flex flex-col justify-between bg-[#34373a]">
          <div>
            <h2 className=" text-lg font-semibold text-white">
              {product.name}
            </h2>
            <h3 className="text-sm text-gray-300 truncate max-w-[30ch] overflow-hidden group-hover:opacity-0 sm:hidden">
              {product.summary}
            </h3>
          </div>
          <div className="flex justify-between items-center mt-2 flex-col md:flex-row pb-3.5">
            <span className="text-lg pb-3.5 font-bold text-[#00D878] sm:pb-2 md:pb-0">
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
