import { baseApi } from "@/redux/api/baseApi";
import { IProduct } from "@/types";

export const productCardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getprductCard: builder.query<IProduct[], void>({
            query: () => "/product",
            providesTags: ["productCard"],
        }),
    }),
});

export const {
    useGetprductCardQuery
} = productCardApi;