import shopingProductsJson from "@/utils/helpers/shopingProduct.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/shoping-products";

const shopingProductsDB = [...shopingProductsJson];

export const shopingProductsHandlers = [
  // GET all shopping products
  http.get(BASE_URL, () => {
    return HttpResponse.json(shopingProductsDB, { status: 200 });
  }),
  // GET Single product
  http.get(`${BASE_URL}/:id`, ({ params }) => {
    const { id } = params as { id: string };

    const product = shopingProductsDB.find((item) => item._id === id);

    if (!product) {
      return HttpResponse.json(
        { message: "Shopping product not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(product, { status: 200 });
  }),
];
