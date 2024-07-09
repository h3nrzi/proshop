import apiSlice from "../store/api-slice";
import Product from "../types/Product";
import { PRODUCT_URL, UPLOAD_URL } from "../utils/constants";

interface Req {
  GetAll: void;
  GetOne: { productId?: string };
  Create: { data: Product };
  Update: { productId?: string; data: Product };
  Delete: { productId?: string };
  UploadImage: FormData;
  CreateReview: { comment: string; rating: number; productId?: string };
}
interface Res {
  GetAll: Product[];
  GetOne: Product;
  Create: Product;
  Update: Product;
  Delete: { message: string };
  UploadImage: { message: string; image: string };
  CreateReview: { message: string };
}

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Queries

    getAllProducts: builder.query<Res["GetAll"], Req["GetAll"]>({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ["Products"],
    }),

    getProduct: builder.query<Res["GetOne"], Req["GetOne"]>({
      query: ({ productId }) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      providesTags: ["Products"],
    }),

    // Mutations

    createProduct: builder.mutation<Res["Create"], Req["Create"]>({
      query: ({ data }) => ({
        url: PRODUCT_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<Res["Update"], Req["Update"]>({
      query: ({ productId, data }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<Res["Delete"], Req["Delete"]>({
      query: ({ productId }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    uploadProductImage: builder.mutation<Res["UploadImage"], Req["UploadImage"]>({
      query: (formData) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    createProductReview: builder.mutation<Res["CreateReview"], Req["CreateReview"]>({
      query: ({ comment, rating, productId }) => ({
        url: `${PRODUCT_URL}/${productId}/review`,
        method: "POST",
        body: { comment, rating, productId },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
} = productsApi;
export default productsApi;
