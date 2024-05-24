import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import "./styles.scss";
import Anchor from "../general-components/anchor";
import { useRecoilState } from "recoil";
import { isUser } from "../../states/user-state";
import { isMenu } from "../../states/menu-state";

function Header() {
  const [user, setUser] = useRecoilState(isUser);
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenu);
  const navRef = useRef<HTMLAnchorElement>(null);
  const currentPage = useLocation();
  const { pathname } = currentPage;
  navRef.current?.setAttribute("aria-current", "");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const products = document.getElementById("products");
    const login = document.getElementById("signDesktop");
    const loginMenu = document.getElementById("signin");
    switch (pathname) {
      case "/products":
        products?.classList.add("list-link__text--current");
        login?.classList.remove("link-nav__current");
        loginMenu?.classList.remove("link-menu__current");

        break;
      case "/cart":
        products?.classList.remove("list-link__text--current");
        login?.classList.remove("link-nav__current");
        loginMenu?.classList.remove("link-menu__current");
        break;

      case "/login":
        login?.classList.add("link-nav__current");
        loginMenu?.classList.add("link-menu__current");
        products?.classList.remove("list-link__text--current");
        break;
      default:
        products?.classList.remove("list-link__text--current");
        login?.classList.remove("link-nav__current");
        loginMenu?.classList.remove("link-menu__current");
        break;
    }
  }, [pathname, user]);

  const renderLoginButton = () => {
    if (user == false) {
      if (pathname != "/signup") {
        return (
          <Link to="/login" id="signDesktop" className="link-nav">
            Sign In
          </Link>
        );
      } else if (pathname == "/signup") {
        return (
          <Link to="/signup" id="signupDesktop" className="link-nav">
            Sign Up
          </Link>
        );
      }
    } else {
      return (
        <button id="logout" className="link-nav" onClick={() => setUser(false)}>
          Log Out
        </button>
      );
    }
  };

  // useEffect(() => {
  //   function listenerLogin() {
  //     if (pathname === "/login") {
  //       const navbar = document.querySelector(".header");
  //       if (navbar) {
  //         // navbar.classList.add("header-scrolled");
  //       }
  //     }
  //   }
  //   listenerLogin();
  // }, [pathname]);

  // useEffect(() => {
  //   function listenerScroll() {
  //     const navbar = document.querySelector(".header");
  //     if (navbar && pathname !== "/login") {
  //       console.log(pathname != "/login");
  //       if (isMenuOpen) {
  //         navbar.classList.add("header-scrolled");
  //       } else if (window.scrollY > 100 && !isMenuOpen) {
  //         navbar.classList.add("header-scrolled");
  //       } else {
  //         navbar.classList.remove("header-scrolled");
  //       }
  //     }
  //   }

  //   window.addEventListener("scroll", listenerScroll);
  //   listenerScroll();
  // }, [isMenuOpen, window.scrollY, pathname]);

  return (
    <>
      <header className="header">
        <nav className="nav-container">
          <Link to="/" className="nav-container__img">
            <img
              className="nav-container__img"
              src="/images/OnlyLogo.png"
              alt="Logo"
              onClick={() => {
                if (isMenuOpen) {
                  setIsMenuOpen(!isMenuOpen);
                }
              }}
            />
          </Link>
          <FontAwesomeIcon
            className="text-[#a4a8a8] text-3xl cursor-pointer md:hidden absolute right-4"
            icon={faBars}
            onClick={toggleMenu}
          />
          <div
            className={`duration-400 top-full min-h-screen md:min-h-[45px] md:static absolute w-1/2 right-0 md:w-full flex justify-center items-start md:md:items-center ${
              isMenuOpen
                ? "bg-gradient-to-b from-[#FDFEFE] from-30% via-[#008248] via-50% to-[#008248] to-70% md:w-auto flex "
                : "-right-[112%]"
            }`}
          >
            <ul className="pt-6 md:bg-transparent flex md:flex-row md:pt-0  justify-center flex-col md:items-start w-full">
              <Anchor
                link={"/products"}
                id="products"
                text={"Products"}
              ></Anchor>
              <Anchor
                link={"/"}
                id="orderDetails"
                text={"Order Details"}
              ></Anchor>
              <Anchor link={"/"} id="about" text={"About"}></Anchor>
              <Anchor link={"/"} id="contact" text={"Contact"}></Anchor>
              {pathname === "/signup" ? (
                <Anchor
                  className="link-menu"
                  link="/signup"
                  id="signup"
                  text="SignUp"
                ></Anchor>
              ) : (
                <Anchor
                  className="link-menu"
                  link="/signin"
                  id="signin"
                  text="SignIn"
                ></Anchor>
              )}
            </ul>
          </div>
          <Link to={"/cart"}>
            <FontAwesomeIcon
              className="hidden md:flex text-[#008248] text-2xl pr-8 cursor-pointer "
              icon={faCartShopping}
            />
          </Link>
          {renderLoginButton()}
        </nav>
      </header>
    </>
  );
}

export default Header;
