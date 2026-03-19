import { createSlice } from "@reduxjs/toolkit";

const getReviewsFromStorage = () => {
  const storedReviews = localStorage.getItem("reviews");
  return storedReviews ? JSON.parse(storedReviews) : {};
};
const initialState = {
  reviewsByProductId: getReviewsFromStorage(),
};

export const reviewSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addReview: (state, action) => {
      const { productId, review } = action.payload;

      if (!state.reviewsByProductId[productId]) {
        state.reviewsByProductId[productId] = [];
      }

      state.reviewsByProductId[productId].push(review);

      localStorage.setItem("reviews", JSON.stringify(state.reviewsByProductId));
    },
  },
});

export const { addReview } = reviewSlice.actions;

export default reviewSlice.reducer;
