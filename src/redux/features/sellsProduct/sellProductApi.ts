import { baseApi } from "@/redux/api/baseApi";
import { ISellsProduct } from "@/types";

export const sellProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSellProduct: builder.query<ISellsProduct[], void>({
            query: () => "/sell-products",
            providesTags: ["sellProduct"],
        }),
    }),
});

export const {
    useGetSellProductQuery
} = sellProductApi;