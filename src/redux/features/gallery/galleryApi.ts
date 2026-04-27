import { baseApi } from "@/redux/api/baseApi";
import { IGallery } from "@/types/gallery";

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGalleryItems: builder.query<IGallery[], void>({
      query: () => "/gallery",
      providesTags: ["Gallery"],
    }),
    getGalleryItemById: builder.query<IGallery, string>({
      query: (id) => `/gallery/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Gallery", id }],
    }),
    createGalleryItem: builder.mutation<IGallery, Partial<IGallery>>({
      query: (body) => ({
        url: "/gallery",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Gallery"],
    }),
    updateGalleryItem: builder.mutation<IGallery, { id: string; body: Partial<IGallery> }>({
      query: ({ id, body }) => ({
        url: `/gallery/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Gallery", id }],
    }),
    deleteGalleryItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useGetGalleryItemsQuery,
  useGetGalleryItemByIdQuery,
  useCreateGalleryItemMutation,
  useUpdateGalleryItemMutation,
  useDeleteGalleryItemMutation,
} = galleryApi;
