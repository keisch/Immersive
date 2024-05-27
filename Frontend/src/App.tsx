import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./views/home/home-page";
import Footer from "./components/footer";
import LogIn from "./views/login/login";
import ProductsPage from "./views/product-list/products-page";
import ProductDetails from "./views/product-details/product-details";
import NotFoundPage from "./views/not-found/not-found-page";
import ScrollToTop from "./components/scroll-to-top";
import Cart from "./views/cart/cart";
import CheckOut from "./views/checkout/checkout";
import Header from "./components/header";
import SignUp from "./views/singup/signup";
import "react-tooltip/dist/react-tooltip.css";
import WishList from "./views/wishList/wishList";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
