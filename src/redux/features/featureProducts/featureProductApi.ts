import { baseApi } from "@/redux/api/baseApi";
import { IProduct } from "@/types";

export const featureProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProducts: builder.query<IProduct[], void>({
      query: () => "/feature-product",
      providesTags: ["featureProduct"],
    }),
    getTopSellingProducts: builder.query<IProduct[], void>({
      query: () => "/sell-products",
      providesTags: ["sellProduct"],
    }),
    getOnSaleProducts: builder.query<IProduct[], void>({
      query: () => "/on-sale-products",
      providesTags: ["featureProduct"],
    }),
  }),
});

export const {
  useGetFeaturedProductsQuery,
  useGetTopSellingProductsQuery,
  useGetOnSaleProductsQuery,
} = featureProductApi;