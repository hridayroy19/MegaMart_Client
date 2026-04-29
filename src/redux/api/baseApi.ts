import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const fatchQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: async (args, api, extraOptions) => {
        const result = await fatchQuery(args, api, extraOptions);
        
        // Determine method (defaults to GET)
        const method = (args as any)?.method || 'GET';

        // Only unwrap standard data wrapper for GET requests
        if (
            method === 'GET' &&
            result.data && 
            typeof result.data === "object" && 
            "data" in result.data
        ) {
            return { ...result, data: (result.data as any).data };
        }
        
        return result;
    },
    tagTypes: ["FlashSale", "FeatureCategory", "productCard", "offer", "featureProduct", "sellProduct", "brands", "HotDealsToday", "ShopingProduct", "blogPost", "VendorProduct", "Gallery", "Auth", "Wishlist", "Orders"] as const,
    endpoints: () => ({}),
});