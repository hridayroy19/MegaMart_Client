import { baseApi } from "@/redux/api/baseApi";
import { IBlogPost } from "@/types/blogPost";

export const blogPostApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogPost: builder.query<IBlogPost[], void>({
            query: () => "/blogPost",
            providesTags: ["blogPost"],
        }),
        getBlogPostById: builder.query<IBlogPost, string>({
            query: (id) => `/blogPost/${id}`,
            providesTags: (r, e, id) => [{ type: "blogPost", id }],
        }),
    }),

});

export const {
    useGetBlogPostQuery,
    useGetBlogPostByIdQuery
} = blogPostApi;