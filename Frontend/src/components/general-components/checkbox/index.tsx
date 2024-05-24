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
    <div className="px-4">
      <Checkbox
        isSelected={feature}
        color="success"
        onValueChange={handleIsSelected}
      >
        Featured Products
      </Checkbox>
    </div>
  );
};

export default CheckboxFeaturedProd;
