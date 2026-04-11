import { IVendorProducts } from "@/types/vendor";
import shopingProductsJson from "@/utils/helpers/vendorData.json";
import { http, HttpResponse } from "msw";

const BASE_URL = "/api/v1/vendor-products";

const vendorProductsDB: IVendorProducts[] = [...shopingProductsJson];

export const vendorProductsHandlers = [
    // GET all shopping products
    http.get(BASE_URL, () => {
        return HttpResponse.json(vendorProductsDB, { status: 200 });
    }),
    // GET all same product
    http.get(`${BASE_URL}/:productKey`, ({ params }) => {
        const { productKey } = params as { productKey: string };

        const products = vendorProductsDB.filter(
            (item) => item.productKey === productKey
        );

        if (!products.length) {
            return HttpResponse.json(
                { message: "Vendor products not found" },
                { status: 404 }
            );
        }

        return HttpResponse.json(products, { status: 200 });
    }),

];