import ProductDetailsComponent from "../../components/product-details";
import { useParams } from "react-router-dom";
import ProductHero from "../../components/product-hero";
import { useEffect, useState } from "react";
import axios from "axios";
import IProduct from "../../models/product/product-interface";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/details?productId=${productId}`)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [productId]);

  return (
    <>
      <ProductHero name="Product Details"></ProductHero>
      <ProductDetailsComponent product={product}></ProductDetailsComponent>
    </>
  );
};

export default ProductDetails;
