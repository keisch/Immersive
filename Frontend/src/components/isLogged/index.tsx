import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUser } from "../../states/user-state";
const ProtectedRouteUser = () => {
  const isLogged = useRecoilValue(isUser);
  return isLogged ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRouteUser;
