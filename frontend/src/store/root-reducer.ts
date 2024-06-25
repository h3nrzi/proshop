import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "./api-slice";
import cartSlice from "../app/cart-slice";

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
});

export default reducer;
