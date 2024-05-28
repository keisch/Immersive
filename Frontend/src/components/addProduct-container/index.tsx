import { useState, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../general-components/modal";
import axios from "axios";

const AddProductContainer = () => {
  const [productName, setProductName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isFeature, setIsFeature] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [summary, setSummary] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleCloseErrorModal = (): void => {
    setShowErrorModal(false);
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleIsFeatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsFeature(parseInt(e.target.value));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (productName === "") {
      setErrorMessage("Enter the Product Name to continue");
      setShowErrorModal(true);
    } else if (category === "") {
      setErrorMessage("Enter the Category to continue");
      setShowErrorModal(true);
    } else if (isFeature === null) {
      setErrorMessage("Select if the product is featured to continue");
      setShowErrorModal(true);
    } else if (description === "") {
      setErrorMessage("Enter the Description to continue");
      setShowErrorModal(true);
    } else if (imageUrl === "") {
      setErrorMessage("Enter the Image URL to continue");
      setShowErrorModal(true);
    } else if (price === null) {
      setErrorMessage("Enter the Price to continue");
      setShowErrorModal(true);
    } else if (summary === "") {
      setErrorMessage("Enter the Summary to continue");
      setShowErrorModal(true);
    } else {
      axios
        .post(
          "http://localhost:8080/products",
          {
            name: productName,
            category: category,
            description: description,
            featured: isFeature,
            img: imageUrl,
            price: price,
            summary: summary,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function () {
          notification();
        })
        .catch(function (error) {
          if (error.response == false) {
            console.log("error adding to cart");
          }
        });
    }
  };

  const notification = () => {
    toast.success("Product Added");
    setTimeout(() => {}, 2000);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="cart-container">
        <h1 className="cart-container__text">ADMIN DASHBOARD</h1>
      </div>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full md:flex-row form">
          <div className="w-full ">
            <div className=" bg-[#34373a] max-w-[100%] m-4 p-3 md:mx-10 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between items-center">
              <div className="w-full flex flex-col sm:flex-row">
                <div className=" sm:w-[100%] ">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Product Name
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={handleProductNameChange}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row">
                <div className="w-full sm:w-[50%] flex flex-col sm:pr-5">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Category
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </div>
                <div className="w-full sm:w-[50%] flex flex-col sm:pr-5">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Is Feature
                  </h3>
                  <select
                    className="w-full p-2 mb-6 text-sm bg-[#6e6e6e] text-white rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    aria-label="Select Feature"
                    value={isFeature}
                    onChange={handleIsFeatureChange}
                  >
                    <option
                      value=""
                      aria-label="Select feature option"
                      disabled
                      selected
                      className="text-white"
                    >
                      Feature Product
                    </option>
                    <option value="Yes" aria-label="Yes" className="text-white">
                      Yes
                    </option>
                    <option value="No" aria-label="No" className="text-white">
                      No
                    </option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                  Description
                </h3>
                <input
                  className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248] "
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="w-full">
                <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                  Image (Only URL)
                </h3>
                <input
                  className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248] "
                  type="text"
                  placeholder="Image Url"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                />
              </div>
              <div className="flex flex-col w-full sm:flex-row">
                <div className="w-full sm:w-[20%] flex flex-col sm:pr-5">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Price
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="text"
                    placeholder="Price"
                    maxLength={5}
                    value={price}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="w-full sm:w-[80%]">
                  <h3 className="text-white text-lg font-semibold pl-1 pb-2">
                    Summary
                  </h3>
                  <input
                    className="w-full p-2 mb-6 text-sm text-white bg-[#6e6e6e] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
                    type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={handleSummaryChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <button
            className="inline-block bg-[#008248] hover:scale-110 text-white mb-6 py-2 px-5 rounded-full text-sm font-semibold uppercase mr-2"
            aria-label="Submit Checkout"
            type="submit"
          >
            Add Product
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
export default AddProductContainer;
