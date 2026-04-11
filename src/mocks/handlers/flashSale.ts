import { IFlashSale } from "@/types";
import flashSalesJson from "@/utils/helpers/flashSalesProducts.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/flash-sales";

let flashSalesDB: IFlashSale[] = [...flashSalesJson];

export const flashSaleHandlers = [
  // GET all flash sales
  http.get(BASE_URL, () => {
    return HttpResponse.json(flashSalesDB, { status: 200 });
  }),

  // GET single flash sale by ID
  http.get(`${BASE_URL}/:id`, ({ params }) => {
    const { id } = params as { id: string };

    const item = flashSalesDB.find((p) => p._id === id);

    if (!item) {
      return HttpResponse.json(
        { message: "Flash sale not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(item, { status: 200 });
  }),

  // CREATE flash sale
  http.post(BASE_URL, async ({ request }) => {
    const body = (await request.json()) as Omit<IFlashSale, "_id">;

    const newItem: IFlashSale = {
      _id: Date.now().toString(),
      ...body,
    };

    flashSalesDB.unshift(newItem);

    return HttpResponse.json(newItem, { status: 201 });
  }),

  // UPDATE flash sale
  http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
    const { id } = params as { id: string };
    const updates = (await request.json()) as Partial<IFlashSale>;

    const index = flashSalesDB.findIndex((item) => item._id === id);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Flash sale not found" },
        { status: 404 }
      );
    }

    flashSalesDB[index] = {
      ...flashSalesDB[index],
      ...updates,
    };

    return HttpResponse.json(flashSalesDB[index], { status: 200 });
  }),

  // DELETE flash sale
  http.delete(`${BASE_URL}/:id`, ({ params }) => {
    const { id } = params as { id: string };

    const prevLength = flashSalesDB.length;
    flashSalesDB = flashSalesDB.filter((item) => item._id !== id);

    if (flashSalesDB.length === prevLength) {
      return HttpResponse.json(
        { message: "Flash sale not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];
