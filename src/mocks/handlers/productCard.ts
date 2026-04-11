import { IProduct } from '@/types';
import productJson from "@/utils/helpers/products.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/product";

// In-memory DB copy
let productCardDB: IProduct[] = [...productJson];

export const productCardHandlers = [
    // GET all products
    http.get(BASE_URL, () => {
        return HttpResponse.json(productCardDB, { status: 200 });
    }),

    // GET single product by ID
    http.get(`${BASE_URL}/:id`, ({ params }) => {
        const { id } = params as { id: string };

        const item = productCardDB.find((p) => p._id === id);

        if (!item) {
            return HttpResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return HttpResponse.json(item, { status: 200 });
    }),

    // CREATE product
    http.post(BASE_URL, async ({ request }) => {
        const body = (await request.json()) as Omit<IProduct, "_id">;

        const newItem: IProduct = {
            _id: Date.now().toString(),
            ...body,
        };

        productCardDB.unshift(newItem);

        return HttpResponse.json(newItem, { status: 201 });
    }),

    // UPDATE product
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        const { id } = params as { id: string };
        const updates = (await request.json()) as Partial<IProduct>;

        const index = productCardDB.findIndex((item) => item._id === id);

        if (index === -1) {
            return HttpResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        productCardDB[index] = {
            ...productCardDB[index],
            ...updates,
        };

        return HttpResponse.json(productCardDB[index], { status: 200 });
    }),

    // DELETE product
    http.delete(`${BASE_URL}/:id`, ({ params }) => {
        const { id } = params as { id: string };

        const prevLength = productCardDB.length;
        productCardDB = productCardDB.filter((item) => item._id !== id);

        if (productCardDB.length === prevLength) {
            return HttpResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
