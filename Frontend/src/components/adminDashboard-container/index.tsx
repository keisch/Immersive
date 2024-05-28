import { useNavigate } from "react-router-dom";

const AdminDashboardContainer = () => {
  const navigate = useNavigate();

  const goToAddProduct = () => {
    navigate("/addProduct");
  };

  //   const goToEditProduct = () => {
  //     navigate("/editProduct");
  //   };

  //   const goToDeleteProduct = () => {
  //     navigate("/deleteProduct");
  //   };

  const goToChangeOrderState = () => {
    navigate("/changeOrderState");
  };

  return (
    <div className="min-h-[100vh]">
      <div className="cart-container">
        <h1 className="cart-container__text">Change O</h1>
      </div>
      <div className="px-9 flex flex-col md:flex-row">
        <div className="w-full md:w-[50%] md:pr-2">
          <button
            onClick={goToAddProduct}
            className="w-full p-2 mb-6 text-sm font-bold text-white bg-[#34373a] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
          >
            Add Product
          </button>
          {/* <button
            onClick={goToEditProduct}
            className="w-full p-2 mb-6 text-sm font-bold text-white bg-[#34373a] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
          >
            Edit Product
          </button>
          <button
            onClick={goToDeleteProduct}
            className="w-full p-2 mb-6 text-sm font-bold text-white bg-[#34373a] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
          >
            Delete Product
          </button> */}
        </div>
        <div className="w-full md:w-[50%]">
          <button
            onClick={goToChangeOrderState}
            className="w-full p-2 mb-6 text-sm font-bold text-white bg-[#34373a] placeholder-gray-300 rounded-md focus:outline-none focus:outline-2 focus:outline-[#008248]"
          >
            Change Order State
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboardContainer;
