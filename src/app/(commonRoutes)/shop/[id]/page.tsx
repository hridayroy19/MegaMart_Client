"use client";

import ProductDetailsView from "@/container/shop_page/productDetailsView/productDetailsView";
import { useGetShopingProductByIdQuery } from "@/redux/features/shopingProduct/shopingProductApi";
import { useParams } from "next/navigation";

const Page = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } =
        useGetShopingProductByIdQuery(id);

    if (isLoading) {
        return <div className="p-6">Loading...</div>;
    }

    if (isError || !data) {
        return <div className="p-6">Product not found</div>;
    }
    return <ProductDetailsView product={data} />;
};

export default Page;
