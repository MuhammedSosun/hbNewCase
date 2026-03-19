import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProduct: [],
  selectedProduct: null,
  currentPage: 1,
  sortBy: "",
  selectedBrand: [],
  selectedColor: [],
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
      const brand = action.payload;
      if(state.selectedBrand.includes(brand)){
        state.selectedBrand = state.selectedBrand.filter(
        (item) => item !== brand) 
      } else{
        state.selectedBrand.push(brand);
      }
      state.currentPage = 1;
    },
    setSelectedColor: (state, action) => {
      const color = action.payload;
      if(state.selectedColor.includes(color)){
        state.selectedColor = state.selectedColor.filter(
          (item) => item !== color
        );
      }else{
        state.selectedColor.push(color);
      }
      state.currentPage =1;
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
