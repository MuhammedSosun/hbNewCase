import { useDispatch } from "react-redux";
import Header from "./layout/Header";
import RouterConfig from "./config/RouterConfig";
import { useEffect } from "react";
import { mockProducts } from "./mock/products";
import { setProducts } from "./redux/slice/ProductSlice";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem("products");

    if (localData) {
      dispatch(setProducts(JSON.parse(localData)));
    }
    const fetchAndMergeProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const apiData = await response.json();

        const combinedProducts = [...mockProducts, ...apiData];

        if (JSON.stringify(combinedProducts) !== localData) {
          dispatch(setProducts(combinedProducts));
          localStorage.setItem("products", JSON.stringify(combinedProducts));
        }
      } catch (err) {
        console.error("API hatası, mock veriler kullanılıyor:", err);
        if (!localData) {
          dispatch(setProducts(mockProducts));
          localStorage.setItem("products", JSON.stringify(mockProducts));
        }
      }
    };

    fetchAndMergeProducts();
  }, [dispatch]);

  return (
    <>
      <Header />
      <RouterConfig />
    </>
  );
}

export default App;
