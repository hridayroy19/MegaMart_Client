import { baseApi } from "@/redux/api/baseApi";
import { IFeatureProduct } from "@/types";

export const featureProduct = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getfeaturePrducts: builder.query<IFeatureProduct[], void>({
            query: () => "/featureProduct",
            providesTags: ["featureProduct"],
        }),
    }),
});

export const {
    useGetfeaturePrductsQuery
} = featureProduct;