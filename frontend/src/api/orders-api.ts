import apiSlice from "../store/api-slice";
import Cart from "../types/Cart";
import Order from "../types/Order";
import { ORDER_URL } from "../utils/constants";

interface RequestData {
  GetOrder: { orderId: string };
  CreateOrder: Cart;
  // UpdateOrderToPaid: { orderId: string; details: any };
  // UpdateOrderToDeliver: string;
}

interface ResponseData {
  // GetOrders: Order[];
  GetOrder: Order;
  // GetPayPalClientId: { clientId: string };
  GetMyOrders: Order[];
  CreateOrder: Order;
  // UpdateOrderToPaid: Order;
  // UpdateOrderToDeliver: Order;
}

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Queries

    getOrder: builder.query<ResponseData["GetOrder"], RequestData["GetOrder"]>({
      query: ({ orderId }) => ({ url: `${ORDER_URL}/${orderId}` }),
    }),

    getMyOrders: builder.query<ResponseData["GetMyOrders"], void>({
      query: () => ({ url: `${ORDER_URL}/myorders` }),
    }),

    // Mutations

    createOrder: builder.mutation<ResponseData["CreateOrder"], RequestData["CreateOrder"]>({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetOrderQuery, useGetMyOrdersQuery, useCreateOrderMutation } = orderApi;
