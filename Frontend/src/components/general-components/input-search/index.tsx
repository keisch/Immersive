import { Input } from "@nextui-org/react";

interface FiltersProductsProps {
  onChangeSearchInput: (searchString: string) => void;
}

const InputSearch: React.FC<FiltersProductsProps> = ({
  onChangeSearchInput,
}) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input
        type="text"
        label="Product Name"
        color="default"
        classNames={{
          label: "text-black",
        }}
        onValueChange={onChangeSearchInput}
      />
    </div>
  );
};

export default InputSearch;
