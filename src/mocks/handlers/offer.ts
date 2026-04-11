import { IOffer } from "@/types";
import offerJson from "@/utils/helpers/offers.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/offer";

const offer: IOffer[] = [...offerJson];

export const offerCardHandlers = [
    // GET all flash sales
    http.get(BASE_URL, () => {
        return HttpResponse.json(offer, { status: 200 });
    }),

]