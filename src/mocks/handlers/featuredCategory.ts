
import { IFeatureCategory } from "@/types";
import featureCategoriesJson from "@/utils/helpers/featureCategories.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/feature-categories";

let featureCategoriesDB: IFeatureCategory[] = [...featureCategoriesJson];

export const featureCategoryHandlers = [
    // GET all feature categories
    http.get(BASE_URL, () => {
        return HttpResponse.json(featureCategoriesDB, { status: 200 });
    }),

    // GET single feature category by ID
    http.get(`${BASE_URL}/:id`, ({ params }) => {
        const { id } = params as { id: string };

        const item = featureCategoriesDB.find((p) => p._id === id);

        if (!item) {
            return HttpResponse.json(
                { message: "Feature category not found" },
                { status: 404 }
            );
        }

        return HttpResponse.json(item, { status: 200 });
    }),

    // CREATE feature category
    http.post(BASE_URL, async ({ request }) => {
        const body = (await request.json()) as Omit<IFeatureCategory, "_id">;

        const newItem: IFeatureCategory = {
            _id: Date.now().toString(),
            ...body,
        };

        featureCategoriesDB.unshift(newItem);

        return HttpResponse.json(newItem, { status: 201 });
    }),

    // UPDATE feature category
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        const { id } = params as { id: string };
        const updates = (await request.json()) as Partial<IFeatureCategory>;

        const index = featureCategoriesDB.findIndex((item) => item._id === id);

        if (index === -1) {
            return HttpResponse.json(
                { message: "Feature category not found" },
                { status: 404 }
            );
        }

        featureCategoriesDB[index] = {
            ...featureCategoriesDB[index],
            ...updates,
        };

        return HttpResponse.json(featureCategoriesDB[index], { status: 200 });
    }),

    // DELETE feature category
    http.delete(`${BASE_URL}/:id`, ({ params }) => {
        const { id } = params as { id: string };

        const prevLength = featureCategoriesDB.length;
        featureCategoriesDB = featureCategoriesDB.filter((item) => item._id !== id);

        if (featureCategoriesDB.length === prevLength) {
            return HttpResponse.json(
                { message: "Feature category not found" },
                { status: 404 }
            );
        }

        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
