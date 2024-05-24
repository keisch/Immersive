import { Link } from "react-router-dom";
import "./styles.scss";

export default function Hero() {
  return (
    <>
      <div id="home" className="hero">
        <h1 className="hero__h1">
          Start your day with a great cup of&nbsp;
          <Link to={"/products"} className="hero__h1--color">
            coffee
          </Link>
        </h1>
        <p className="hero__description">
          Best coffee products for professional baristas and casual coffee
          enjoyers
        </p>
      </div>
    </>
  );
}
