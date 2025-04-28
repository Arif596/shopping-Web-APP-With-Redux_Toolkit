import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], /// Final product store in this items
  tempItems: [], // temporary chnages store in this tempItem like quantity change and amount and update
  totalPrice: 0,
};
const CartSlice = createSlice({
  name: "Cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const existItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.tempItems = [...state.items];
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    upadateValueCart(state, action) {
      const tempItem = state.tempItems.find(
        (item) => item.id === action.payload
      );
      const cartItem = state.items.find((item) => item.id === action.payload);
      if (tempItem && cartItem) {
        cartItem.quantity = tempItem.quantity;
      }
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    updateQuantityCart(state, action) {
      const tempItem = state.tempItems.find(
        (item) => item.id === action.payload.id
      );
      if (tempItem) {
        tempItem.quantity = action.payload.quantity;
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.tempItems = [...state.items];
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.tempItems = [];
      state.totalPrice = 0;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  updateQuantityCart,
  upadateValueCart,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
