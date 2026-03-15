import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slice/ProductSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
  },
});
