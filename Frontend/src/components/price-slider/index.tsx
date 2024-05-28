import React from "react";
import { Slider } from "@nextui-org/react";
import IProduct from "../../models/product/product-interface";

interface PriceSliderProps {
  products: IProduct[];
  handleSelectedPriceRange: (priceRange: number[]) => void;
  handleResetPagination: () => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  products,
  handleSelectedPriceRange,
  handleResetPagination,
}) => {
  const minPrice = Math.min(...products.map((product) => product.price));
  const maxPrice = Math.max(...products.map((product) => product.price));

  const roundPriceDownToTen = (price: number): number => {
    if (price < 10) {
      return price;
    }
    return Math.floor(price / 10) * 10;
  };

  const roundPriceUpToTen = (price: number): number => {
    return Math.ceil(price / 10) * 10;
  };
  return (
    <>
      <Slider
        label="Price Range"
        step={0.1}
        minValue={roundPriceDownToTen(minPrice)}
        maxValue={roundPriceUpToTen(maxPrice)}
        defaultValue={[
          roundPriceDownToTen(minPrice),
          roundPriceUpToTen(maxPrice),
        ]}
        formatOptions={{ style: "currency", currency: "USD" }}
        className="pt-4"
        classNames={{
          label: "text-white",
          labelWrapper: "text-white",
          filler: "bg-[#008248]",
          thumb: "bg-[#008248]",
        }}
        onChange={(values: number[] | number) => {
          if (!Array.isArray(values)) {
            handleSelectedPriceRange([values, values]);
          } else {
            handleSelectedPriceRange(values);
          }
          handleResetPagination();
        }}
      />
    </>
  );
};

export default PriceSlider;
