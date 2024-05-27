import React, { ChangeEvent, FormEvent, useState } from "react";
import "./styles.scss";
import Modal from "../general-components/modal/"; // Asegúrate de importar el componente Modal desde la ubicación correcta
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckOutForm: React.FC = () => {
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [zipCode, setZipCode] = useState<number | null>(null);
  const [isValidZip, setIsValidZip] = useState<boolean>(true);
  const [cardNumber, setCardNumber] = useState<number>();
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [cvv, setCvv] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [cardType, setCardType] = useState<string>("");
  const [isValidCard, setIsValidCard] = useState<boolean>(false);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [isValidCvv, setisValidCvv] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (address1 === "") {
      setErrorMessage("Enter the address1 to continue");
      setShowErrorModal(true);
    } else if (city === "") {
      setErrorMessage("Enter the city to continue");
      setShowErrorModal(true);
    } else if (province === "") {
      setErrorMessage("Enter the province to continue");
      setShowErrorModal(true);
    } else if (zipCode === null) {
      setErrorMessage("Enter the Zip Code to continue");
      setShowErrorModal(true);
    } else if (!isValidZip) {
      setErrorMessage("Enter a valid Zip Code to continue");
      setShowErrorModal(true);
    } else if (cardNumber === null) {
      setErrorMessage("Enter the cardNumber to continue");
      setShowErrorModal(true);
    } else if (isValidCard === false) {
      setErrorMessage("Enter a valid cardNumber to continue");
      setShowErrorModal(true);
    } else if (cardHolderName === "") {
      setErrorMessage("Enter the cardHolderName to continue");
      setShowErrorModal(true);
    } else if (expirationDate === "") {
      setErrorMessage("Enter the expirationDate to continue");
      setShowErrorModal(true);
    } else if (cvv === null) {
      setErrorMessage("Enter the cvv to continue");
      setShowErrorModal(true);
    } else if (!isValidCvv) {
      setErrorMessage("Enter a valid cvv to continue");
      setShowErrorModal(true);
    } else {
      console.log(cardNumber);
      axios
        .post(
          "http://localhost:8080/order",
          {
            address1: address1,
            address2: address2,
            city: city,
            province: province,
            zipCode: zipCode,
            cardNumber: cardNumber,
            cardHolderName: cardHolderName,
            cardExpiryDate: expirationDate,
            cardCVV: cvv,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          notification();
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 401) {
              setErrorMessage("Wrong Email or Password");
              setShowErrorModal(true);
            }
          }
        });
    }
  };

  const notification = () => {
    toast.success("Thank you for your purchase");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleCloseErrorModal = (): void => {
    setShowErrorModal(false);
  };

  const handleAddress1Change = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddress1(e.target.value);
  };

  const handleAddress2Change = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddress2(e.target.value);
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setProvince(e.target.value);
  };

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");

    const zipCodePattern = /^[1-7][0-9]{4}$/;
    if (zipCodePattern.test(numericValue)) {
      setZipCode(parseInt(numericValue, 10));
      setIsValidZip(true);
    } else if (!isNaN(parseInt(numericValue, 10))) {
      setZipCode(parseInt(numericValue, 10));
      setIsValidZip(false);
    } else {
      setZipCode(null);
      setIsValidZip(false);
    }
  };

  const isValidLuhn = (cardNumber: string): boolean => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i], 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const getCardType = (cardNumber: string): string => {
    const firstDigit = cardNumber[0];
    const firstTwoDigits = cardNumber.slice(0, 2);

    if (firstDigit === "4") {
      return "Visa";
    } else if (["51", "52", "53", "54", "55"].includes(firstTwoDigits)) {
      return "Mastercard";
    } else if (["34", "37"].includes(firstTwoDigits)) {
      return "Amex";
    } else {
      return "Unknown";
    }
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(value, 10);

    const formattedValue = value.match(/.{1,4}/g)?.join(" ");
    setDisplayValue(formattedValue || "");

    if (!isNaN(numericValue)) {
      const lastFourDigits = value.slice(-4);
      const lastFourNumericValue = parseInt(lastFourDigits, 10);

      console.log(lastFourNumericValue);
      setCardNumber(lastFourNumericValue);

      const cardNumberStr = value;
      setCardType(getCardType(cardNumberStr));
      setIsValidCard(isValidLuhn(cardNumberStr));
    }
  };

  const handleCardHolderNameChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setCardHolderName(e.target.value);
  };

  const handleExpirationDateChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setExpirationDate(e.target.value);
  };

  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue)) {
      setCvv(numericValue);

      if (
        (value.length === 3 &&
          (cardType === "Mastercard" || cardType === "Visa")) ||
        (value.length === 4 && cardType === "Amex")
      ) {
        setisValidCvv(true);
      } else {
        setisValidCvv(false);
      }
    } else {
      setCvv(null);
      setisValidCvv(false);
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full md:flex-row form">
          <div className="w-full md:w-[50%]">
            <h2 className="mt-14 p-4 font-bold text-2xl text-[#00d878] md:pl-10">
              SHIPPING
            </h2>
            <div className=" bg-[#34373a] max-w-[100%] m-4 p-3 md:mx-10 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between items-center">
              <div className="w-full flex flex-col sm:flex-row">
                <div className=" sm:w-[100%] ">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Address 1
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="text"
                    placeholder="Address 1"
                    value={address1}
                    onChange={handleAddress1Change}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row">
                <div className="w-full sm:w-[50%] sm:pr-5">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Address 2
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="text"
                    placeholder="Address 2"
                    value={address2}
                    onChange={handleAddress2Change}
                  />
                </div>
                <div className="w-full sm:w-[50%]">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    City
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248] "
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={handleCityChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full sm:flex-row">
                <div className="w-full sm:w-[50%] sm:pr-5">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Province
                  </h3>
                  <select
                    className="w-full p-2 mb-6 text-sm bg-[#6e6e6e] text-white rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    aria-label="Select province"
                    value={province}
                    onChange={handleProvinceChange}
                  >
                    <option
                      value=""
                      aria-label="Select province option"
                      disabled
                      selected
                      className="text-white"
                    >
                      Select province
                    </option>
                    <option
                      value="province1"
                      aria-label="heredia"
                      className="text-white"
                    >
                      Heredia
                    </option>
                    <option
                      value="province2"
                      aria-label="San Jose"
                      className="text-white"
                    >
                      San Jose
                    </option>
                    <option
                      value="province3"
                      aria-label="Cartago"
                      className="text-white"
                    >
                      Cartago
                    </option>
                    <option
                      value="province4"
                      aria-label="Limon"
                      className="text-white"
                    >
                      Limon
                    </option>
                    <option
                      value="province5"
                      aria-label="Puntarenas"
                      className="text-white"
                    >
                      Puntarenas
                    </option>
                    <option
                      value="province6"
                      aria-label="Guanacaste"
                      className="text-white"
                    >
                      Guanacaste
                    </option>
                    <option
                      value="province7"
                      aria-label="Alajuela"
                      className="text-white"
                    >
                      Alajuela
                    </option>
                  </select>
                </div>
                <div className="w-full sm:w-[50%]">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Zip Code
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="text"
                    placeholder="Zip Code"
                    maxLength={5}
                    value={zipCode || ""}
                    onChange={handleZipCodeChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[50%]">
            <h2 className="mt-14 p-4 font-bold text-2xl text-[#00d878] md:pl-10">
              CARD
            </h2>
            <div className="max-w-[100%] m-4 p-1 md:mx-10 rounded-lg overflow-hidden flex flex-col justify-between items-center">
              <div className="w-full flex flex-col sm:flex-row md:flex-col ">
                <div className="sm:w-[50%] sm:pr-5 md:pr-0 md:w-full">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Card Number
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#34373a] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="text"
                    placeholder="Card Number"
                    value={displayValue}
                    maxLength={19}
                    onChange={handleCardNumberChange}
                  />
                </div>
                <div className=" w-full sm:w-[50%] md:w-full">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Card Holder Name
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#34373a] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="text"
                    placeholder="Card Holder Name"
                    value={cardHolderName}
                    onChange={handleCardHolderNameChange}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row w-full">
                <div className="w-full sm:w-[50%] sm:pr-5 md:w-[60%]">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Expiration Date
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#34373a] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="month"
                    placeholder="Expiration Date"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                  />
                </div>
                <div className="w-full sm:w-[50%] md:w-[40%]">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    CVV
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#34373a] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="password"
                    placeholder="CVV"
                    maxLength={4}
                    value={cvv || ""}
                    onChange={handleCvvChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <button
            className="inline-block bg-[#008248]  hover:scale-110 text-white mb-6 py-2 px-5 rounded-full text-sm font-semibold uppercase mr-2"
            aria-label="Submit Checkout"
            type="submit"
          >
            Complete purchase
          </button>
        </div>
      </form>
      <Modal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </>
  );
};

export default CheckOutForm;
