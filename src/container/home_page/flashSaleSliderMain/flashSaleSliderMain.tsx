"use client";

import { useGetFlashSalesQuery } from "@/redux/features/flashSale/flashSaleApi";
import { IFlashSale } from "@/types";
import { FlashSaleSlider } from "./_flashSaleSlider";

export const FlashSaleSliderMain = () => {
    const { data, isLoading, isError } = useGetFlashSalesQuery();

    if (isLoading) {
        return (
            <section className="py-6">
                <h2 className="mb-4 text-2xl font-bold">Flash Sales Today</h2>
                <p className="text-sm text-muted-foreground">Loading deals...</p>
            </section>
        );
    }

    if (isError || !data || data.length === 0) {
        return (
            <section className="py-6">
                <h2 className="mb-4 text-2xl font-bold">Flash Sales Today</h2>
                <p className="text-sm text-destructive">No flash sales found.</p>
            </section>
        );
    }

    return <FlashSaleSlider items={data as IFlashSale[]} />;
};
