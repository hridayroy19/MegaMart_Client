import { IHotDealsToday } from "@/types";
import hotDealsTodayJson from "@/utils/helpers/hotDealsToday.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/hot-deals-today";

let hotDealsTodayDB: IHotDealsToday[] = [...hotDealsTodayJson];

export const hotDealsTodayHandlers = [
    // GET all hot deals today
    http.get(BASE_URL, () => {
        return HttpResponse.json(hotDealsTodayDB, { status: 200 });
    }),

    // GET single hot deal by ID
    http.get(`${BASE_URL}/:id`, ({ params }) => {
        const { id } = params as { id: string };

        const item = hotDealsTodayDB.find((p) => p._id === id);

        if (!item) {
            return HttpResponse.json(
                { message: "Hot deal not found" },
                { status: 404 }
            );
        }

        return HttpResponse.json(item, { status: 200 });
    }),

    // CREATE hot deal
    http.post(BASE_URL, async ({ request }) => {
        const body = (await request.json()) as Omit<IHotDealsToday, "_id">;

        const newItem: IHotDealsToday = {
            _id: Date.now().toString(),
            ...body,
        };

        hotDealsTodayDB.unshift(newItem);

        return HttpResponse.json(newItem, { status: 201 });
    }),

    // UPDATE hot deal
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        const { id } = params as { id: string };
        const updates = (await request.json()) as Partial<IHotDealsToday>;

        const index = hotDealsTodayDB.findIndex((item) => item._id === id);

        if (index === -1) {
            return HttpResponse.json(
                { message: "Hot deal not found" },
                { status: 404 }
            );
        }

        hotDealsTodayDB[index] = {
            ...hotDealsTodayDB[index],
            ...updates,
        };

        return HttpResponse.json(hotDealsTodayDB[index], { status: 200 });
    }),

    // DELETE hot deal
    http.delete(`${BASE_URL}/:id`, ({ params }) => {
        const { id } = params as { id: string };

        const prevLength = hotDealsTodayDB.length;
        hotDealsTodayDB = hotDealsTodayDB.filter((item) => item._id !== id);

        if (hotDealsTodayDB.length === prevLength) {
            return HttpResponse.json(
                { message: "Hot deal not found" },
                { status: 404 }
            );
        }

        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
