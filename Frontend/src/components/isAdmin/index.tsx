import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isRolUser } from "../../states/roleUser";
const ProtectedRouteAdmin = () => {
  const isAdmin = useRecoilValue(isRolUser);
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRouteAdmin;
