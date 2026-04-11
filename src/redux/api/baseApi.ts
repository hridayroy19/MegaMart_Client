import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const fatchQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    // prepareHeaders: (headers, { getState }) => {
    //     const token = (getState() as RootState).auth.token;
    //     if (token) {
    //         headers.set("authorization", `${token}`);
    //     }
    // },
});

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fatchQuery,
    tagTypes: ["FlashSale", "FeatureCategory", "productCard", "offer", "featureProduct", "sellProduct", "brands", "HotDealsToday", "ShopingProduct","blogPost","VendorProduct" ] as const,
    endpoints: () => ({}),
});