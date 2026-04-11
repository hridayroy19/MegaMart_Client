import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlashSaleUIState {
    selectedId: string | null;
    activeSlide: number;
}

const initialState: FlashSaleUIState = {
    selectedId: null,
    activeSlide: 0,
};

const flashSaleSlice = createSlice({
    name: "flashSaleUI",
    initialState,
    reducers: {
        setSelectedFlashSaleId: (state, action: PayloadAction<string | null>) => {
            state.selectedId = action.payload;
        },
        setActiveSlide: (state, action: PayloadAction<number>) => {
            state.activeSlide = action.payload;
        },
    },
});

export const { setSelectedFlashSaleId, setActiveSlide } =
    flashSaleSlice.actions;

export default flashSaleSlice.reducer;
