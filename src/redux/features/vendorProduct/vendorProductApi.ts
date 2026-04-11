import { baseApi } from "@/redux/api/baseApi";
import { IVendorProducts } from "@/types/vendor";

export const vendorProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all vendor products
        getVendorProducts: builder.query<IVendorProducts[], void>({
            query: () => "/vendor-products",
            providesTags: ["VendorProduct"],
        }),

        // GET vendor-wise products by productKey
        getVendorProductsByKey: builder.query<IVendorProducts[], string>({
            query: (productKey) => `/vendor-products/${productKey}`,
            providesTags: (_result, _error, productKey) => [
                { type: "VendorProduct", id: productKey },
            ],
        }),
    }),
});

export const {
    useGetVendorProductsQuery,
    useGetVendorProductsByKeyQuery,
} = vendorProductApi;
