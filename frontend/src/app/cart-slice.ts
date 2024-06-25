import { createSlice } from "@reduxjs/toolkit";
import Cart from "../types/Cart";

const initialCartState: Cart = {
  orderItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  shippingAddress: undefined,
  paymentMethod: undefined,
};

const persistedCartState: Cart | null = JSON.parse(localStorage.getItem("cart")!);
const initialState: Cart = persistedCartState || initialCartState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice;
