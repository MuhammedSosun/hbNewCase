import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProduct: [],
  selectedProduct: null,
  currentPage: 1,
  sortBy: "",
  selectedBrand: "",
  selectedColor: "",
  searchTerm: "",
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
    setSelectedBrand: (state, action) => {
      state.selectedBrand =
        state.selectedBrand === action.payload ? "" : action.payload;
      state.currentPage = 1;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor =
        state.selectedColor === action.payload ? "" : action.payload;
      state.currentPage = 1;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct =
        state.products.find((product) => product.id === action.payload) || null;
    },
  },
});

export const {
  setSelectedBrand,
  setSelectedColor,
  setProducts,
  setCurrentPage,
  setSortOrder,
  setSearchTerm,
  setSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
