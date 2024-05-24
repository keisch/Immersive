import ProductDetailsComponent from "../../components/product-details";
import { useParams } from "react-router-dom";
import productsList from "../../database/products";
import ProductHero from "../../components/product-hero";
const ProductDetails = () => {
  const { productId } = useParams();
  const product = productsList.find(
    (p) => p.id === Number.parseInt(productId as string)
  );
  return (
    <>
      <ProductHero name="Product Details"></ProductHero>
      <ProductDetailsComponent product={product}></ProductDetailsComponent>
    </>
  );
};

export default ProductDetails;
