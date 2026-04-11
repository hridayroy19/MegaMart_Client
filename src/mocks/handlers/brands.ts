import { IBrand } from '@/types';
import productJson from "@/utils/helpers/brands.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/brands";

const brand: IBrand[] = [...productJson];

export const brandsHandlers = [
    // GET all flash sales
    http.get(BASE_URL, () => {
        return HttpResponse.json(brand, { status: 200 });
    }),

]