import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import "./styles.scss";
import Anchor from "../general-components/anchor";
import { useRecoilState } from "recoil";
import { isUser } from "../../states/user-state";
import { isMenu } from "../../states/menu-state";
import { cart } from "../../states/cart-state";
import { isRolUser } from "../../states/roleUser";

function Header() {
  const [user, setUser] = useRecoilState(isUser);
  const [admin, setAdmin] = useRecoilState(isRolUser);
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenu);
  const [cartList] = useRecoilState(cart);
  const navRef = useRef<HTMLAnchorElement>(null);
  const currentPage = useLocation();
  const { pathname } = currentPage;
  navRef.current?.setAttribute("aria-current", "");
  const totalItems = cartList.reduce((total, item) => total + item.quantity, 0);

  console.log("admin", admin);
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

      case "/signin":
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
          <Link to="/signin" id="signDesktop" className="link-nav">
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
        <button
          id="logout"
          className="link-nav"
          onClick={() => {
            setUser(false);
            setAdmin(false);
            localStorage.setItem("token", "");
          }}
        >
          Log Out
        </button>
      );
    }
  };

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
            className={`absolute md:static right-0 w-1/2 md:w-full top-full min-h-screen md:min-h-[45px] flex items-start md:items-center justify-center transition duration-0 ${
              isMenuOpen ? "bg-[#212325] flex" : "-right-96"
            }`}
          >
            <ul className="pt-6 md:bg-transparent flex md:flex-row md:pt-0  justify-center flex-col md:items-start w-full">
              <Anchor
                link={"/products"}
                id="products"
                text={"Products"}
              ></Anchor>
              <Anchor
                link={"/orders"}
                id="orderDetails"
                text={"Order History"}
              ></Anchor>
              <Anchor
                link={"/wishList"}
                id="wishList"
                text={"Wish List"}
              ></Anchor>
              {admin == true ? (
                <Anchor
                  link={"/adminDashboard"}
                  id="adminDashboard"
                  text={"Admin Dashboard"}
                ></Anchor>
              ) : (
                ""
              )}
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
          <Link to="/cart" aria-label="cart">
            {pathname !== "/cart" ? (
              <div className="flex relative mt-1 pt-2 mr-14 md:mr-7">
                <p className="text-white absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 mr-[12px] mb-4">
                  {totalItems}
                </p>
                <FontAwesomeIcon
                  className="text-[#00D878] text-2xl cursor-pointer"
                  icon={faCartShopping}
                />
              </div>
            ) : (
              ""
            )}
          </Link>
          {renderLoginButton()}
        </nav>
      </header>
    </>
  );
}

export default Header;
