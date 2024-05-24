import React, { useState } from "react";
import "./styles.scss";

const CheckOutForm: React.FC = () => {
  const [shippingData, setShippingData] = useState({
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
  });

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cardNumber") {
      newValue = value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    setCardData({ ...cardData, [name]: newValue });

    if (name === "cardNumber" && newValue.replace(/\s/g, "").length < 16) {
      e.target.classList.add("invalid");
    } else {
      e.target.classList.remove("invalid");
    }
  };

  return (
    <div className="container-form">
      <h2 className="container-form__title">Shipping Form</h2>
      <form className="container-shipping">
        <p className="container-shipping__text">Address 1:</p>
        <input
          className="container-shipping__input"
          type="text"
          id="address1"
          name="address1"
          value={shippingData.address1}
          onChange={handleShippingChange}
          required
        />

        <p className="container-shipping__text">Address 2:</p>
        <input
          type="text"
          className="container-shipping__input"
          id="address2"
          name="address2"
          value={shippingData.address2}
          onChange={handleShippingChange}
        />
        <p className="container-shipping__text">City:</p>
        <input
          className="container-shipping__input"
          type="text"
          id="city"
          name="city"
          value={shippingData.city}
          onChange={handleShippingChange}
          required
        />

        <p className="container-shipping__text">Province:</p>
        <select
          className="container-shipping__select"
          id="province"
          name="province"
          value={shippingData.province}
          onChange={handleShippingChange}
          required
        >
          <option value="">Select province</option>
          <option value="province1">Heredia</option>
          <option value="province2">San Jose</option>
          <option value="province3">Cartago</option>
          <option value="province4">Limon</option>
          <option value="province5">Puntarenas</option>
          <option value="province6">Guanacaste</option>
          <option value="province7">Alajuela</option>
        </select>

        <p className="container-shipping__text">Zip Code:</p>
        <input
          className="container-shipping__input"
          type="text"
          id="zip"
          name="zip"
          value={shippingData.zip}
          onChange={handleShippingChange}
          required
          pattern="[0-9]{5}"
        />
      </form>
      <h2 className="container-form__title">Credit Card Info Form</h2>
      <form>
        <p className="container-shipping__text">Card Number:</p>

        <input
          type="text"
          className="container-shipping__input"
          id="cardNumber"
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={handleCardChange}
          required
        />

        <p className="container-shipping__text">Card Holder Name:</p>

        <input
          type="text"
          className="container-shipping__input"
          id="cardHolderName"
          name="cardHolderName"
          value={cardData.cardHolderName}
          onChange={handleCardChange}
          required
        />

        <p className="container-shipping__text">Expiration Date (MM/YY):</p>

        <input
          type="text"
          className="container-shipping__input"
          id="expirationDate"
          name="expirationDate"
          value={cardData.expirationDate}
          onChange={handleCardChange}
          required
        />

        <p className="container-shipping__text">CVV:</p>

        <input
          type="text"
          className="container-shipping__input"
          id="cvv"
          name="cvv"
          value={cardData.cvv}
          onChange={handleCardChange}
          required
        />
      </form>
    </div>
  );
};

export default CheckOutForm;
