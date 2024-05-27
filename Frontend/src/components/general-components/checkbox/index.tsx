import { Checkbox } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { isFeature } from "../../../states/feature-state";

interface CheckboxFeaturedProdProps {
  handleFeatureProds: (isFeature: boolean) => void;
}

const CheckboxFeaturedProd: React.FC<CheckboxFeaturedProdProps> = ({
  handleFeatureProds,
}) => {
  const [feature, setIsFeature] = useRecoilState(isFeature);

  const handleIsSelected = () => {
    setIsFeature(!feature);
    handleFeatureProds(!feature);
  };

  return (
    <div className="">
      <Checkbox
        isSelected={feature}
        color="success"
        onValueChange={handleIsSelected}
      >
        <span className="text-white">Only Featured Products</span>
      </Checkbox>
    </div>
  );
};

export default CheckboxFeaturedProd;
