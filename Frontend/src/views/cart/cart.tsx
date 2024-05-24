import CartContainer from "../../components/cart-container";
import Anchor from "../../components/general-components/anchor";
import Header from "../../components/header";
export default function Cart() {
  return (
    <>
      <Header>
        <Anchor link="/" text="Home"></Anchor>
        <Anchor link="/products" text="Products"></Anchor>
      </Header>
      <CartContainer></CartContainer>
    </>
  );
}
