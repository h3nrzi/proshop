import apiSlice from "../store/api-slice";
import Product from "../types/Product";
import { PRODUCT_URL } from "../utils/constants";

interface Response {
  GetAll: Product[];
  GetOne: Product;
}

const PRODUCT_TAG = "Products";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Response["GetAll"], void>({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: [PRODUCT_TAG],
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
export default productsApi;
