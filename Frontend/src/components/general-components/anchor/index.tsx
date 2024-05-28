import { Link } from "react-router-dom";
import { useRef } from "react";
import IAnchor from "../../../models/anchor/anchor-interface";
import "./styles.scss";
import { useRecoilState } from "recoil";
import { isFeature } from "../../../states/feature-state";
import { isMenu } from "../../../states/menu-state";

export default function Anchor(props: IAnchor) {
  const navRef = useRef<HTMLAnchorElement>(null);
  navRef.current?.setAttribute("aria-current", "");
  const [, setIsFeature] = useRecoilState(isFeature);
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenu);

  return (
    <>
      <li className={`list-link ${props.className}`}>
        <Link
          to={props.link}
          id={props.id}
          aria-label={props.aria_current}
          className="list-link__text"
          onClick={() => {
            setIsFeature(false);
            if (isMenuOpen) {
              setIsMenuOpen(!isMenuOpen);
            }
          }}
        >
          {props.text}
        </Link>
      </li>
    </>
  );
}
