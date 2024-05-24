import "./styles.scss";

interface IProps {
  name?: string;
}
export default function ProductHero({ name }: IProps) {
  return (
    <>
      <div id="home" className="hero-product-details">
        <h1 className="hero-product-details__h1">{name}</h1>
      </div>
    </>
  );
}
