import { ISellsProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SellProductUIState {
    items: ISellsProduct[];
    selectedId: string | null;
    activeSlide: number;
}

const initialState: SellProductUIState = {
    items: [],
    selectedId: null,
    activeSlide: 0,
};

const sellProductSlice = createSlice({
    name: "sellProductUI",
    initialState,
    reducers: {
        setProductCart: (state, action: PayloadAction<ISellsProduct[]>) => {
            state.items = action.payload;
        },

        addProductCart: (state, action: PayloadAction<ISellsProduct>) => {
            state.items.unshift(action.payload);
        },

        updateProductCart: (state, action: PayloadAction<ISellsProduct>) => {
            const index = state.items.findIndex(
                (item) => item._id === action.payload._id
            );
            if (index !== -1) state.items[index] = action.payload;
        },

        removeProductCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },

        setSelectedProductCart: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.selectedId = action.payload;
        },

        setActiveSlide: (state, action: PayloadAction<number>) => {
            state.activeSlide = action.payload;
        },
    },
});

export const {
    setProductCart,
    addProductCart,
    updateProductCart,
    removeProductCart,
    setSelectedProductCart,
    setActiveSlide,
} = sellProductSlice.actions;

export default sellProductSlice.reducer;
