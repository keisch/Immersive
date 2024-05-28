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
import OrderHistory from "./views/orderHistory/order-history-page";
import axios from "axios";
import { useRecoilState } from "recoil";
import { isRolUser } from "./states/roleUser";
import ProtectedRouteUser from "./components/isLogged";
import { useEffect } from "react";
import { isUser } from "./states/user-state";
import ProtectedRouteAdmin from "./components/isAdmin";
import AdminDashboard from "./views/adminDashboard/adminDasboard";
import AddProduct from "./views/addProduct/addProduct";
import ChangeOrderStateView from "./views/changeOrderState/changeOrderState";

function App() {
  const [, setUserRol] = useRecoilState(isRolUser);
  const [user] = useRecoilState(isUser);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response.data.role);
        if (response.data.role.id === 2) {
          setUserRol(true);
        } else {
          setUserRol(false);
        }
      })
      .catch(function (error) {
        if (error.response) {
        }
      });
  }, [user]);
  return (
    <>
      <ScrollToTop />
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRouteUser />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Route>
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/addProduct" element={<AddProduct />} />
          {/* <Route path="/editProduct" element={<AddProduct />} />
          <Route path="/deleteProduct" element={<AddProduct />} /> */}
          <Route path="/changeOrderState" element={<ChangeOrderStateView />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
