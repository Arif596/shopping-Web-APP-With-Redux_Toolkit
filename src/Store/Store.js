import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Feathures/ProductSlice";
import CartReducwer from "../Feathures/CardSlice";
export const store = configureStore({
  reducer: {
    products: productReducer,
    Cart: CartReducwer,
  },
});
