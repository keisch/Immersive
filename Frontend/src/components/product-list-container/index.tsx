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

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Number);
  const [products, setProducts] = useState<string[]>([]);
  const [checkboxCategories, setCheckboxCategories] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [stringSearchProdName, setStringSearchProdName] = useState<string>("");
  const [featureProd, setFeatureProds] = useState(true);
  const [feature] = useRecoilState(isFeature);

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
    let url = "http://localhost:8080/products?";
    if (selectedCategories.length > 0) {
      const categoriesString = selectedCategories.join(",");
      url += `categories=${encodeURIComponent(categoriesString)}&`;
    }

    if (feature) {
      url += `featured=${feature}&`;
    }

    if (stringSearchProdName) {
      url += `name=${stringSearchProdName}&`;
    }

    if (selectedPriceRange) {
      url += `price=${selectedPriceRange.join(",")}&`;
    }

    url += `page=${currentPage - 1}`;
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
    <div className="py-10 min-h-[50vh] px-11 flex flex-col items-center justify-center gap-4 ">
      <div className="flex flex-col">
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
        <InputSearch onChangeSearchInput={setStringSearchProdName} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 gap-y-10 justify-items-center">
        {products.map((data, index) => (
          <ProductCard key={index} product={data}></ProductCard>
        ))}
      </div>
      {products.length ? (
        <ListPagination
          pagination={{ currentPage, totalPages, onPageChange }}
        />
      ) : (
        <>
          <p>There are no products that match the filters.</p>
          <img
            className="w-[100px]"
            src="images/errorC.png"
            alt="No product match"
          />
        </>
      )}
    </div>
  );
}

export default ProductList;
