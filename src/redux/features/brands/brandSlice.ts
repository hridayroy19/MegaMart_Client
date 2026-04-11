import { IBrand } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrandsUIState {
    items: IBrand[];
    selectedId: string | null;
    activeSlide: number;
}

const initialState: BrandsUIState = {
    items: [],
    selectedId: null,
    activeSlide: 0,
};

const sellBrandsSlice = createSlice({
    name: "bransUI",
    initialState,
    reducers: {
        setBrandsCart: (state, action: PayloadAction<IBrand[]>) => {
            state.items = action.payload;
        },

        addBrandsCart: (state, action: PayloadAction<IBrand>) => {
            state.items.unshift(action.payload);
        },

        updateBrandsCart: (state, action: PayloadAction<IBrand>) => {
            const index = state.items.findIndex(
                (item) => item._id === action.payload._id
            );
            if (index !== -1) state.items[index] = action.payload;
        },

        removeBrandsCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },

        setSelectedBrandsCart: (
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
    setBrandsCart,
    addBrandsCart,
    updateBrandsCart,
    removeBrandsCart,
    setSelectedBrandsCart,
    setActiveSlide,
} = sellBrandsSlice.actions;

export default sellBrandsSlice.reducer;
