import { useEffect } from "react";
import Anchor from "../../components/general-components/anchor";
import Header from "../../components/header";
import Hero from "../../components/hero";
import HomeProducts from "../../components/home-products";
import IUser from "../../models/user/user-interface";
import { useRecoilState } from "recoil";
import { isUser } from "../../states/user-state";
import { isFeature } from "../../states/feature-state";

function HomePage() {
  const [user] = useRecoilState(isUser);
  const serializedUser = localStorage.getItem("user");

  // const getUserData = () => {
  //   if (serializedUser) {
  //     const myObject: IUser[] = JSON.parse(serializedUser);
  //     setUser(myObject);
  //     console.log(myObject);
  //   } else {
  //     console.log("No object found in local storage");
  //   }
  // };
  // useEffect(() => {
  //   getUserData();
  // }, []);
  return (
    <>
      <Hero></Hero>
      <HomeProducts></HomeProducts>
    </>
  );
}

export default HomePage;
