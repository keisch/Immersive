import { Link } from "react-router-dom";
import IProduct from "../../models/product/product-interface";
import { useRecoilState } from "recoil";
import { cart } from "../../states/cart-state";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import putItem from "../../utilities/ShoppingCart/putItem";
import { wish } from "../../states/wish-state";
import { useEffect, useState } from "react";
import putWishListRequest from "../../utilities/WishList/putWishListItem";
import deleteWishListItem from "../../utilities/WishList/deleteWishListItem";
import ICartItem from "../../models/cart/cart-interface";
import getWishList from "../../utilities/WishList/getWishLisrItem";
import getShoppingCart from "../../utilities/ShoppingCart/getItem";
import postItemFromWish from "../../utilities/ShoppingCart/postItemFromWish";

interface IProps {
  product: ICartItem;
}

const WishListCard = ({ product }: IProps) => {
  const [, setWishList] = useRecoilState(wish);
  const [cartList, setCartList] = useRecoilState(cart);
  const [, setIsInWishList] = useState<boolean>();

  useEffect(() => {
    getWishList(setWishList);
    getShoppingCart(setCartList);
  }, []);

  const addItem = (item: ICartItem) => {
    let newQuantity = item.quantity + 1;
    putWishListRequest(item, newQuantity, setWishList);
  };

  const removeItem = (item: ICartItem) => {
    let newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      putWishListRequest(item, newQuantity, setWishList);
    } else {
      deleteWishListItem(setWishList, product.products.id);
    }
  };

  const notification = () => {
    toast("Item added to cart", {
      icon: <FontAwesomeIcon className="text-[#008248]" icon={faCartPlus} />,
    });
  };

  const addToCart = (element: ICartItem) => {
    console.log(element.quantity);
    const existingItem = cartList.find(
      (item) => item.products.id === element.products.id
    );

    if (existingItem) {
      putItem(
        existingItem,
        existingItem.quantity + element.quantity,
        setCartList
      );
    } else {
      postItemFromWish(element.products, element.quantity, setCartList);
    }
    notification();
    deleteWishListItem(setWishList, product.products.id);
  };

  const removeFromWishList = (element: IProduct) => {
    deleteWishListItem(setWishList, element.id);
    setIsInWishList(false);
  };

  return (
    <>
      <div className="p-4 md:p-2 flex flex-wrap justify-center">
        <div className="w-full sm:h-[300] xl:h-[348] sm:max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-[0.3s] ease-in-out hover:scale-[1.05] hover:rounded-md hover:shadow-md hover:border hover:border-gray-400 relative group">
          <div className="relative">
            <button
              className="absolute top-0 right-0 pl-2 pr-3 pt-3 pb-2 z-10 hover:scale-125 transition-transform duration-300"
              aria-label="remove from wishList"
              onClick={() => removeFromWishList(product.products)}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="text-xl text-[#008248]"
              />
            </button>
            <div className="relative">
              <Link to={`/products/${product.products.id}`}>
                <img
                  className="w-full sm:h-[300px] xl:[348]"
                  src={product.products.img}
                  alt="product image"
                />
              </Link>
            </div>
            <div className="absolute bottom-0 w-full bg-[#34373a] bg-opacity-95 text-white px-4 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
              <h2 className="text-sm">{product.products.summary}</h2>
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col justify-between bg-[#34373a]">
            <div>
              <h2 className=" text-lg font-semibold text-white">
                {product.products.name}
              </h2>
              <h3 className="text-sm text-gray-300 truncate max-w-[30ch] overflow-hidden group-hover:opacity-0 sm:hidden">
                {product.products.summary}
              </h3>
            </div>
            <div className="flex flex-col justify-between items-center mt-2 md:flex-row pb-3.5">
              <span className="text-lg pb-1 font-bold text-[#00D878] sm:pb-2 md:pb-0">
                ${product.products.price * product.quantity}
              </span>
              <div className="flex items-center">
                <button
                  className="pr-[10px] pl-[10px] pb-[2px] bg-[#212325] text-white rounded-[10px]"
                  onClick={() => removeItem(product)}
                >
                  -
                </button>
                <p className="text-white p-2">{product.quantity}</p>
                <button
                  className="pr-[10px] pl-[10px] pb-[2px] bg-[#212325] text-white rounded-[10px]"
                  onClick={() => addItem(product)}
                >
                  +
                </button>
              </div>
              <button
                className="mt-2 inline-block bg-[#008248] hover:scale-110 text-white py-1 px-3 rounded-full text-xs font-semibold uppercase sm:mt-0"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-left" />
    </>
  );
};

export default WishListCard;
