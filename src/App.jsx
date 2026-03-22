import { useDispatch } from "react-redux";
import Header from "./layout/Header";
import RouterConfig from "./config/RouterConfig";
import { useEffect } from "react";
import { mockProducts } from "./mock/products";
import { setProducts } from "./redux/slice/ProductSlice";

function App() {
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("API_URL:", API_URL);
    console.log("Request URL:", `${API_URL}/products`);

    const localData = localStorage.getItem("products");

    if (localData) {
      try {
        const parsedLocalData = JSON.parse(localData);

        dispatch(setProducts(parsedLocalData));
      } catch (error) {
        console.error("localStorage parse hatası:", error);
      }
    }

    const fetchAndMergeProducts = async () => {
      const requestUrl = `${API_URL}/products`;

      try {
        const response = await fetch(requestUrl);

        const responseText = await response.text();

        if (!response.ok) {
          throw new Error(`HTTP hata kodu: ${response.status}`);
        }

        let apiData;
        try {
          apiData = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "JSON parse hatası. Gelen veri JSON değil:",
            parseError,
          );
          throw new Error("API JSON yerine farklı bir içerik döndü");
        }

        const combinedProducts = [...mockProducts, ...apiData];

        if (JSON.stringify(combinedProducts) !== localData) {
          dispatch(setProducts(combinedProducts));
          localStorage.setItem("products", JSON.stringify(combinedProducts));
        } else {
          console.log("Yeni veri ile localStorage aynı, güncelleme yapılmadı");
        }
      } catch (err) {
        console.error("API hatası, mock veriler kullanılıyor:", err);

        if (!localData) {
          console.log("localStorage boş olduğu için mock veriler set edildi");
          dispatch(setProducts(mockProducts));
          localStorage.setItem("products", JSON.stringify(mockProducts));
        } else {
          console.log("localStorage dolu olduğu için mevcut veriler korunuyor");
        }
      }
    };

    fetchAndMergeProducts();
  }, [dispatch, API_URL]);

  return (
    <>
      <Header />
      <RouterConfig />
    </>
  );
}

export default App;
