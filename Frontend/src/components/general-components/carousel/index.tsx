import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../carousel-arrow-buttons";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isFeature } from "../../../states/feature-state";

type PropType = {
  products: String[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { products, options } = props;
  const [, setIsFeature] = useRecoilState(isFeature);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsFeature(true);
    navigate("/products");
  };

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  console.log(products);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {products.map((product, index) => (
              <div className="embla__slide" key={index}>
                <img
                  onClick={handleClick}
                  className="embla__slide__image image-container__img "
                  src={product.img}
                  alt={product.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </>
  );
};

export default EmblaCarousel;
