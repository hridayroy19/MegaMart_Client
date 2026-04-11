import { IBlogPost } from '@/types/blogPost';
import productJson from "@/utils/helpers/blogPostData.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/blogPost";

const blogPost: IBlogPost[] = [...productJson];

export const blogPostHandlers = [
    // GET all flash sales
    http.get(BASE_URL, () => {
        return HttpResponse.json(blogPost, { status: 200 });
    }),

    // GET single product by ID
http.get(`${BASE_URL}/:id`, ({ params }) => {
  const { id } = params as { id: string };

  const item = blogPost.find((p) => String(p.id) === String(id));

  if (!item) {
    return HttpResponse.json(
      { message: "blog not found" },
      { status: 404 }
    );
  }

  return HttpResponse.json(item, { status: 200 });
}),



]