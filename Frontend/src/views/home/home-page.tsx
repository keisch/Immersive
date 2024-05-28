import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Hero from "../../components/hero";
import HomeProducts from "../../components/home-products";
import { isUser } from "../../states/user-state";
import { isRolUser } from "../../states/roleUser";

function HomePage() {
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
      <Hero></Hero>
      <HomeProducts></HomeProducts>
    </>
  );
}

export default HomePage;
