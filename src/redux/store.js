import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slice/ProductSlice";
import CartReducer from "./slice/CartSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
  },
});
