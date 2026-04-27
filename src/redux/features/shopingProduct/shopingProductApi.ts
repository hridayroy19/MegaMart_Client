import { baseApi } from "@/redux/api/baseApi";
import { IProduct } from "@/types";

export const shopingProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getShopingProducts: builder.query<IProduct[], void>({
            query: () => "/shoping-products",
            providesTags: ["ShopingProduct"],
        }),
        // GET single shopping product by id (details page)
        getShopingProductById: builder.query<IProduct, string>({
            query: (id) => `/shoping-products/${id}`,
            providesTags: (_result, _error, id) => [
                { type: "ShopingProduct", id },
            ],
        }),
    }),

});

export const {
    useGetShopingProductsQuery,
    useGetShopingProductByIdQuery
} = shopingProductApi;