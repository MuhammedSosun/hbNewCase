import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slice/ProductSlice";
import CartReducer from "./slice/CartSlice";
import ReviewReducer from "./slice/ReviewSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    reviews: ReviewReducer,
  },
});
