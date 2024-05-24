import EmblaCarousel from "../general-components/carousel";
import "./styles.scss";
import productsList from "../../database/products";
import { EmblaOptionsType } from "embla-carousel";

export default function HomeProducts() {
  const options: EmblaOptionsType = { loop: false };
  return (
    <>
      <div className="carousel-container">
        <h2 className="carousel-container__text"> FEATURE PRODUCTS</h2>
        {productsList.filter((x) => x.featured).length === 0 ? (
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
            products={productsList.filter((x) => x.featured)}
            options={options}
          ></EmblaCarousel>
        )}
      </div>
    </>
  );
}
