import { ISellsProduct } from '@/types';
import productJson from "@/utils/helpers/sellProduct.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/sellproduct";

const sellProduct: ISellsProduct[] = [...productJson];

export const sellProductHandlers = [
    // GET all flash sales
    http.get(BASE_URL, () => {
        return HttpResponse.json(sellProduct, { status: 200 });
    }),

]