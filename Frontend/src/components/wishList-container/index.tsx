import { useEffect } from "react";
import getShoppingCart from "../../utilities/ShoppingCart/getItem";
import { useRecoilState } from "recoil";
import { wish } from "../../states/wish-state";
import getWishList from "../../utilities/WishList/getWishLisrItem";
import WishListCard from "../wishList-products";
import postAllRequestFromWish from "../../utilities/ShoppingCart/postAllItemsFromWish";
import { cart } from "../../states/cart-state";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";

export default function WishListContainer() {
  const [wishList, setWishList] = useRecoilState(wish);
  const [, setCartList] = useRecoilState(cart);

  useEffect(() => {
    getWishList(setWishList);
    getShoppingCart(setCartList);
    console.log(wishList);
  }, []);

  const addItem = () => {
    postAllRequestFromWish(setCartList, setWishList);
    notification();
  };

  const notification = () => {
    toast("Items added to cart", {
      icon: <FontAwesomeIcon className="text-[#008248]" icon={faCartPlus} />,
    });
  };

  const totalItems = wishList.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <div className="min-h-[100vh]">
        <div className="cart-container">
          <h1 className="cart-container__text">MY WISHLIST</h1>
          <p className="cart-container__text--item">
            TOTAL: {totalItems} ITEMS
          </p>
        </div>
        <div className="md:w-full md:p-5">
          {wishList.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-10 max-w-[100%]">
              {wishList.map((data, index) => (
                <WishListCard key={index} product={data}></WishListCard>
              ))}
            </div>
          ) : (
            <div className="flex flex-col  justify-center items-center ">
              <p className="text-white text-xl font-normal p-8">
                There are no products in the WishList.
              </p>
              <img
                className="w-[120px]"
                src="images/errorC.png"
                alt="No product match"
              />
            </div>
          )}
        </div>
        {wishList.length ? (
          <div className="flex justify-center p-4">
            <button
              className="inline-block bg-[#008248]  hover:scale-110 text-white mb-6 py-2 px-5 rounded-full text-sm font-semibold uppercase mr-2"
              aria-label="Add All to Cart"
              onClick={addItem}
            >
              Add All To Cart
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <Toaster position="bottom-left" />
    </>
  );
}
