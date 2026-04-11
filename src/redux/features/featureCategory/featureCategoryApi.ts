import { baseApi } from "@/redux/api/baseApi";
import { IFeatureCategory } from "@/types";

export const featureCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureCategories: builder.query<IFeatureCategory[], void>({
      query: () => "/feature-categories",
      providesTags: ["FeatureCategory"],
    }),

    getFeatureCategoryById: builder.query<IFeatureCategory, string>({
      query: (id) => `/feature-categories/${id}`,
      providesTags: (r, e, id) => [{ type: "FeatureCategory", id }],
    }),

    createFeatureCategory: builder.mutation<
      IFeatureCategory,
      Partial<IFeatureCategory>
    >({
      query: (body) => ({
        url: "/feature-categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FeatureCategory"],
    }),
    updateFeatureCategory: builder.mutation<
      IFeatureCategory,
      { id: string; data: Partial<IFeatureCategory> }
    >({
      query: ({ id, data }) => ({
        url: `/feature-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (r, e, { id }) => [
        "FeatureCategory",
        { type: "FeatureCategory", id },
      ],
    }),

    deleteFeatureCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/feature-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FeatureCategory"],
    }),
  }),
});

export const {
  useGetFeatureCategoriesQuery,
  useGetFeatureCategoryByIdQuery,
  useCreateFeatureCategoryMutation,
  useUpdateFeatureCategoryMutation,
  useDeleteFeatureCategoryMutation,
} = featureCategoryApi;
