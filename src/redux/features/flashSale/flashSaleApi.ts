import { baseApi } from "@/redux/api/baseApi";
import { IFlashSale } from "@/types";

export const flashSaleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlashSales: builder.query<IFlashSale[], void>({
      query: () => "/flash-sales",
      providesTags: ["FlashSale"],
    }),

    getFlashSaleById: builder.query<IFlashSale, string>({
      query: (id) => `/flash-sales/${id}`,
      providesTags: (r, e, id) => [{ type: "FlashSale", id }],
    }),

    createFlashSale: builder.mutation<IFlashSale, Partial<IFlashSale>>({
      query: (body) => ({
        url: "/flash-sales",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FlashSale"],
    }),

    updateFlashSale: builder.mutation<
      IFlashSale,
      { id: string; data: Partial<IFlashSale> }
    >({
      query: ({ id, data }) => ({
        url: `/flash-sales/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (r, e, { id }) => [
        "FlashSale",
        { type: "FlashSale", id },
      ],
    }),

    deleteFlashSale: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/flash-sales/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FlashSale"],
    }),
  }),
});

export const {
  useGetFlashSalesQuery,
  useGetFlashSaleByIdQuery,
  useCreateFlashSaleMutation,
  useUpdateFlashSaleMutation,
  useDeleteFlashSaleMutation,
} = flashSaleApi;