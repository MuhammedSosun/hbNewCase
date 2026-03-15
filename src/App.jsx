import { useDispatch } from "react-redux";
import Header from "./layout/Header";
import RouterConfig from "./config/RouterConfig";
import { useEffect } from "react";
import { mockProducts } from "./mock/products";
import { setProducts } from "./redux/slice/ProductSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const localProducts = localStorage.getItem("products");

      if (!localProducts) {
        localStorage.setItem("products", JSON.stringify(mockProducts));
        dispatch(setProducts(mockProducts));
      } else {
        const parsedProducts = JSON.parse(localProducts);
        dispatch(setProducts(parsedProducts));
      }
    } catch (error) {
      console.error("LocalStorage products okunurken hata oluştu:", error);
      localStorage.setItem("products", JSON.stringify(mockProducts));
      dispatch(setProducts(mockProducts));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <RouterConfig />
    </>
  );
}

export default App;
