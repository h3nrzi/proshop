import apiSlice from "../store/api-slice";
import Product from "../types/Product";
import { PRODUCT_URL } from "../utils/constants";

interface Req {
  GetOne: { productId: string };
}
interface Res {
  GetAll: Product[];
  GetOne: Product;
}

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Res["GetAll"], void>({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ["Products"],
    }),

    getProduct: builder.query<Res["GetOne"], Req["GetOne"]>({
      query: ({ productId }) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
export default productsApi;
