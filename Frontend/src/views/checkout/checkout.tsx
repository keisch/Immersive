import CheckOutContainer from "../../components/checkout-container";
import Anchor from "../../components/general-components/anchor";
import Header from "../../components/header";
export default function CheckOut() {
  return (
    <>
      <Header>
        <Anchor link="/" text="Home"></Anchor>
        <Anchor link="/products" text="Products"></Anchor>
        <Anchor link="/cart" text="Shipping Cart"></Anchor>
      </Header>
      <CheckOutContainer></CheckOutContainer>
    </>
  );
}
