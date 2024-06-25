import apiSlice from "../store/api-slice";
import Product from "../types/Product";
import { PRODUCT_URL } from "../utils/constants";

interface Response {
  GetAll: Product[];
  GetOne: Product;
}

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Response["GetAll"], void>({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ["Products"],
    }),

    getProduct: builder.query<Response["GetOne"], { productId: string }>({
      query: ({ productId }) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
export default productsApi;
