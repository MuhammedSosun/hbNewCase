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
    console.log("========== APP INIT ==========");
    console.log("ENV VITE_API_URL:", API_URL);

    const localData = localStorage.getItem("products");
    console.log("localStorage products var mı?:", !!localData);

    if (localData) {
      try {
        const parsedLocalData = JSON.parse(localData);
        console.log(
          "localStorage parse başarılı, ürün sayısı:",
          parsedLocalData.length,
        );
        dispatch(setProducts(parsedLocalData));
      } catch (error) {
        console.error("localStorage parse hatası:", error);
      }
    }

    const fetchAndMergeProducts = async () => {
      const requestUrl = `${API_URL}/products`;

      try {
        console.log("API isteği atılıyor:", requestUrl);

        const response = await fetch(requestUrl);

        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);
        console.log(
          "Response content-type:",
          response.headers.get("content-type"),
        );
        console.log("Response url:", response.url);

        const responseText = await response.text();
        console.log("Response body preview:", responseText.slice(0, 300));

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

        console.log("API ürün sayısı:", apiData.length);

        const combinedProducts = [...mockProducts, ...apiData];
        console.log("Birleşik ürün sayısı:", combinedProducts.length);

        if (JSON.stringify(combinedProducts) !== localData) {
          console.log("Yeni veri localStorage'a yazılıyor");
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
      } finally {
        console.log("========== FETCH FLOW END ==========");
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
