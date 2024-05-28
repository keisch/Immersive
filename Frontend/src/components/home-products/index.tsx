import EmblaCarousel from "../general-components/carousel";
import "./styles.scss";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { cart } from "../../states/cart-state";
import getShoppingCart from "../../utilities/ShoppingCart/getItem";
import getWishList from "../../utilities/WishList/getWishLisrItem";
import { wish } from "../../states/wish-state";
import IProduct from "../../models/product/product-interface";

export default function HomeProducts() {
  const options: EmblaOptionsType = { loop: false };
  const [, setCartList] = useRecoilState(cart);
  const [, setWishList] = useRecoilState(wish);
  const [productsList, setProductsList] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/images")
      .then((response) => {
        setProductsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getShoppingCart(setCartList);
    getWishList(setWishList);
  }, []);

  return (
    <>
      <div className="carousel-container">
        <h2 className="carousel-container__text"> FEATURE PRODUCTS</h2>
        {productsList.length === 0 ? (
          <>
            <p>No featured products available</p>
            <img
              className="max-h-64 max-w-64 pt-4"
              src="/images/errorC.png"
              alt="Error Image"
            />
          </>
        ) : (
          <EmblaCarousel
            products={productsList}
            options={options}
          ></EmblaCarousel>
        )}
      </div>
    </>
  );
}
