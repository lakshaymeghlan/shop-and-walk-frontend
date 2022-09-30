import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import wishlist from "./wishlist_redux";

const store = configureStore({
  reducer: { cart, wishlist },
});

export default store;
