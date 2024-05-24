import { Link } from "react-router-dom";
import "./styles.scss";
import { useRecoilState } from "recoil";
import { isMenu } from "../../states/menu-state";

export default function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenu);

  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <ul className="footer-ul">
          <li>
            <Link to="/" className="footer-ul__img" aria-current="page">
              <img
                className="footer-ul__img"
                src="/images/Logo.png"
                alt="Logo"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </Link>
          </li>
          <li>
            <p className="footer-ul__text">
              All content on this website is protected by copyright and other
              intellectual property laws.
            </p>
          </li>
          <li>
            <ul className="footer-ul-social">
              <li>
                <a
                  href="https://www.facebook.com/coffee.co.fb/"
                  target="_blank"
                >
                  <img
                    className="footer-ul-social__img"
                    src="/images/fb.png"
                    alt="facebook"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/coffee_coig/"
                  target="_blank"
                >
                  <img
                    className="footer-ul-social__img"
                    src="/images/ig.png"
                    alt="instagram"
                  />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/CoffeeCoTwt" target="_blank">
                  <img
                    className="footer-ul-social__img"
                    src="/images/twt.png"
                    alt="twitter"
                  />
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}
