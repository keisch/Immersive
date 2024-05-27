import { useEffect, useState } from "react";
import ProductCard from "../product-card";
import ListPagination from "../pagination";
import FilterComponent from "../filter/index";
import PriceSlider from "../price-slider";
import InputSearch from "../general-components/input-search";
import { useRecoilState } from "recoil";
import { isFeature } from "../../states/feature-state";
import CheckboxFeaturedProd from "../general-components/checkbox";
import axios from "axios";
import IProduct from "../../models/product/product-interface";
import getWishList from "../../utilities/WishList/getWishLisrItem";
import { wish } from "../../states/wish-state";

interface Category {
  id: number;
  category: string;
}

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Number);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [checkboxCategories, setCheckboxCategories] = useState<Category[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [stringSearchProdName, setStringSearchProdName] = useState<string>("");
  const [featureProd, setFeatureProds] = useState(true);
  const [feature] = useRecoilState(isFeature);
  const [, setWishList] = useRecoilState(wish);

  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/prices")
      .then((response) => {
        setPrices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/categoryFilter")
      .then((response) => {
        setCheckboxCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getWishList(setWishList);
  }, []);

  useEffect(() => {
    let url = "http://localhost:8080/products";
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      const categoriesString = selectedCategories.join(",");
      params.append("categories", categoriesString);
    }

    if (feature) {
      params.append("featured", `${feature}`);
    }

    if (stringSearchProdName) {
      params.append("name", stringSearchProdName);
    }

    if (selectedPriceRange) {
      params.append("price", selectedPriceRange.join(","));
    }

    params.append("page", `${currentPage - 1}`);

    url += "?" + params.toString();
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [
    selectedCategories,
    feature,
    currentPage,
    selectedPriceRange,
    stringSearchProdName,
  ]);

  useEffect(() => {
    if (feature !== featureProd) {
      setFeatureProds(feature);
    }
  }, [feature]);

  const categories = Array.from(
    new Set(checkboxCategories.map((category) => category.category))
  );

  const handleSelectedCategories = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handleResetPagination = () => {
    setCurrentPage(1);
  };

  const handleFeatureProds = () => {
    setFeatureProds(!featureProd);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col ">
      <div className="py-10 min-h-[50vh] max-h-80vh px-4 md:px-11 flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-start ">
        <div className="pr-3 flex flex-col lg:max-w-[22%] xl:max-w-[20%] 2xl:max-w-[30%]">
          <InputSearch onChangeSearchInput={setStringSearchProdName} />
          <CheckboxFeaturedProd handleFeatureProds={handleFeatureProds} />
          <FilterComponent
            categories={categories}
            onSelectCategory={handleSelectedCategories}
          />
          {prices.length ? (
            <PriceSlider
              products={prices}
              handleSelectedPriceRange={setSelectedPriceRange}
              handleResetPagination={handleResetPagination}
            />
          ) : (
            <></>
          )}
        </div>
        {products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 gap-y-10 justify-items-center min-w-full lg:min-w-[72%] xl:min-w-[80%] 2xl:min-w-[70%]">
            {products.map((data, index) => (
              <ProductCard key={index} product={data}></ProductCard>
            ))}
          </div>
        ) : (
          <div className="flex flex-col  justify-center items-center lg:min-h-[35vh] md:w-[70%] xl:min-h-[20vh] ">
            <p className="text-white text-xl font-normal p-8">
              There are no products that match the filters.
            </p>
            <img
              className="w-[100px]"
              src="images/errorC.png"
              alt="No product match"
            />
          </div>
        )}
      </div>
      {products.length ? (
        <ListPagination
          pagination={{ currentPage, totalPages, onPageChange }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductList;
