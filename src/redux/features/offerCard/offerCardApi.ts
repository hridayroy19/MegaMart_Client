import { baseApi } from "@/redux/api/baseApi";
import { IOffer } from "@/types";

export const offerCardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOfferCard: builder.query<IOffer[], void>({
            query: () => "/offers",
            providesTags: ["offer"],
        }),
    }),
});

export const {
    useGetOfferCardQuery
} = offerCardApi;
