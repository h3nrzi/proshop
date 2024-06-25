import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "./api-slice";

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default reducer;
