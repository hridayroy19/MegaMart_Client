import { IOffer } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OfferCardUIState {
    items: IOffer[];
    selectedId: string | null;
    activeSlide: number;
}

const initialState: OfferCardUIState = {
    items: [],
    selectedId: null,
    activeSlide: 0,
};

const productCardSlice = createSlice({
    name: "offerCardUI",
    initialState,
    reducers: {
        setOfferCart: (state, action: PayloadAction<IOffer[]>) => {
            state.items = action.payload;
        },

        addOfferCart: (state, action: PayloadAction<IOffer>) => {
            state.items.unshift(action.payload);
        },
    },
});

export const {
    setOfferCart,
    addOfferCart
} = productCardSlice.actions;

export default productCardSlice.reducer;
