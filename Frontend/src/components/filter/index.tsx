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
    <div className="bg-bistre rounded-md p-4 ">
      <span className="color-[#30221C]">Selected Categories</span>
      <CheckboxGroup
        orientation="horizontal"
        color="success"
        onChange={(selectedCategories: string[]) => {
          onSelectCategory(selectedCategories);
        }}
      >
        {categories.map((category, index) => (
          <Checkbox key={index} value={category}>
            {category}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default FiltersProducts;
