import ProductHero from "../../components/product-hero";
import ProductList from "../../components/product-list-container";
import productsList from "../../database/products";
const ProductsPage = () => {
  return (
    <>
      <ProductHero name="Product List"></ProductHero>
      <ProductList productsList={productsList}></ProductList>
    </>
  );
};

export default ProductsPage;
