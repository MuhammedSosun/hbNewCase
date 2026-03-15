import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currentPage: 1,
  sortBy: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { setProducts, setCurrentPage, setSortOrder } =
  productSlice.actions;

export default productSlice.reducer;
