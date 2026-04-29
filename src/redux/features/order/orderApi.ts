import { baseApi } from "../../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => "/orders/my-orders",
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-from-cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    createCodOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-cod",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Orders"],
    }),
  }),
});

export const { 
  useGetMyOrdersQuery, 
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
  useCreateCodOrderMutation
} = orderApi;
