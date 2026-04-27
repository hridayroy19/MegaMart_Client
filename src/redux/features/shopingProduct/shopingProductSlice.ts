import { IProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShopingProductUIState {
    items: IProduct[];
}

const initialState: ShopingProductUIState = {
    items: [],
};

const shopingProductSlice = createSlice({
    name: "shopingProductUI",
    initialState,
    reducers: {
        setShopingProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.items = action.payload;
        },
    },
});

export const {
    setShopingProducts,
} = shopingProductSlice.actions;

export default shopingProductSlice.reducer;