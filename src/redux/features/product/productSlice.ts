import { IProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductCardUIState {
    items: IProduct[];
    selectedId: string | null;
    activeSlide: number;
}

const initialState: ProductCardUIState = {
    items: [],
    selectedId: null,
    activeSlide: 0,
};

const productCardSlice = createSlice({
    name: "productCardUI",
    initialState,
    reducers: {
        setProductCart: (state, action: PayloadAction<IProduct[]>) => {
            state.items = action.payload;
        },

        addProductCart: (state, action: PayloadAction<IProduct>) => {
            state.items.unshift(action.payload);
        },

        updateProductCart: (state, action: PayloadAction<IProduct>) => {
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
} = productCardSlice.actions;

export default productCardSlice.reducer;
