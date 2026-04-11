import { baseApi } from "@/redux/api/baseApi";
import { IHotDealsToday } from "@/types";

export const hotDealsTodayApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all hot deals today
        getHotDealsToday: builder.query<IHotDealsToday[], void>({
            query: () => "/hot-deals-today",
            providesTags: ["HotDealsToday"],
        }),

        // GET single hot deal by ID
        getHotDealTodayById: builder.query<IHotDealsToday, string>({
            query: (id) => `/hot-deals-today/${id}`,
            providesTags: (r, e, id) => [{ type: "HotDealsToday", id }],
        }),

        // CREATE hot deal
        createHotDealToday: builder.mutation<IHotDealsToday, Partial<IHotDealsToday>>({
            query: (body) => ({
                url: "/hot-deals-today",
                method: "POST",
                body,
            }),
            invalidatesTags: ["HotDealsToday"],
        }),

        // UPDATE hot deal
        updateHotDealToday: builder.mutation<
            IHotDealsToday,
            { id: string; data: Partial<IHotDealsToday> }
        >({
            query: ({ id, data }) => ({
                url: `/hot-deals-today/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (r, e, { id }) => [
                "HotDealsToday",
                { type: "HotDealsToday", id },
            ],
        }),

        // DELETE hot deal
        deleteHotDealToday: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/hot-deals-today/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["HotDealsToday"],
        }),
    }),
});

export const {
    useGetHotDealsTodayQuery,
    useGetHotDealTodayByIdQuery,
    useCreateHotDealTodayMutation,
    useUpdateHotDealTodayMutation,
    useDeleteHotDealTodayMutation,
} = hotDealsTodayApi;
