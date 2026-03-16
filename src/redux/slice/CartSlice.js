import { createSlice } from "@reduxjs/toolkit";
//bu hesaplama tutar hesaplamaları için yazıldı virgulden sonra sayı uzar fakat ben compoennt tarafında toFixed metoduyla stringe çevirip virgülden sonra 2 basamak en fazzla gözüksün diye ayarladım
const calculateTotal = (items) => {
  const total = items.reduce((acc, item) => {
    return acc + item.price * (item.quantity || 1);
  }, 0);
  //normalde adede göre eklenir diye ekledim fakat bizim case'de öyle bir şey yok
  return total;
};
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  totalAmount: calculateTotal(JSON.parse(localStorage.getItem("cart")) || []),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exist = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      if (!exist) {
        // burda sıralamayı şöyle yapmış gibi oldum => en son eklenen en üste gelecek şekilde
        state.cartItems = [action.payload, ...state.cartItems];
      }
      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
      state.totalAmount = calculateTotal(state.cartItems);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
