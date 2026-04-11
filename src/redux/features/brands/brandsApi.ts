import { baseApi } from "@/redux/api/baseApi";
import { IBrand } from "@/types";

export const brandsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBrans: builder.query<IBrand[], void>({
            query: () => "/brands",
            providesTags: ["brands"],
        }),
    }),
});

export const {
    useGetAllBransQuery
} = brandsApi;