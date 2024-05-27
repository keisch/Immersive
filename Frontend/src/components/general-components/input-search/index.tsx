import { Input } from "@nextui-org/react";

interface FiltersProductsProps {
  onChangeSearchInput: (searchString: string) => void;
}

const InputSearch: React.FC<FiltersProductsProps> = ({
  onChangeSearchInput,
}) => {
  return (
    <div className="flex w-full flex-wrap pb-8 md:flex-nowrap gap-4">
      <Input
        type="text"
        label="Product Name"
        classNames={{
          label: "text-black text-base group-data-[focus=true]:text-white",
          input: [
            "bg-transparent",
            "text-white",
            "group-data-[focus=true]:text-white",
            "group-data-[focus=false]:text-white",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "group-data-[focus=true]:text-white",
            "group-data-[focus=false]:text-white",
            "bg-default/60",
            "dark:hover:bg-default/90",
            "group-data-[focus=true]:bg-default/10",
          ],
        }}
        onValueChange={onChangeSearchInput}
      />
    </div>
  );
};

export default InputSearch;
