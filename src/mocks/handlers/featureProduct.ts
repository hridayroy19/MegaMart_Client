import { IFeatureProduct } from "@/types";
import productJson from "@/utils/helpers/featuredProducts.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/featureProduct";

const featureProduct: IFeatureProduct[] = [...productJson];

export const featureProductHandlers = [
    // GET all flash sales
    http.get(BASE_URL, () => {
        return HttpResponse.json(featureProduct, { status: 200 });
    }),

]