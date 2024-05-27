import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

interface FiltersProductsProps {
  categories: string[];
  onSelectCategory: (category: string[]) => void;
}

const FiltersProducts: React.FC<FiltersProductsProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="bg-bistre rounded-md pt-4  ">
      <p className="text-white pb-3 text-xl font-semibold">
        Selected Categories
      </p>
      <CheckboxGroup
        orientation="horizontal"
        color="success"
        onChange={(selectedCategories: string[]) => {
          onSelectCategory(selectedCategories);
        }}
      >
        {categories.map((category, index) => (
          <Checkbox key={index} value={category}>
            <span className="text-white">{category}</span>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default FiltersProducts;
