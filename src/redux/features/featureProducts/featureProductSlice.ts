import { IFeatureProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface featureProductUIState {
    items: IFeatureProduct[];
    selectedId: string | null;
    activeSlide: number;
}

const initialState: featureProductUIState = {
    items: [],
    selectedId: null,
    activeSlide: 0,
};

const featureProductSlice = createSlice({
    name: "featureProductUI",
    initialState,
    reducers: {
        setfeatureProductCart: (state, action: PayloadAction<IFeatureProduct[]>) => {
            state.items = action.payload;
        },

        addfeatureProductCart: (state, action: PayloadAction<IFeatureProduct>) => {
            state.items.unshift(action.payload);
        },
    },
});

export const {
    setfeatureProductCart,
    addfeatureProductCart
} = featureProductSlice.actions;

export default featureProductSlice.reducer;
