import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotDealsTodayUIState {
    selectedId: string | null;
    activeSlide: number;
}

const initialState: HotDealsTodayUIState = {
    selectedId: null,
    activeSlide: 0,
};

const hotDealsTodaySlice = createSlice({
    name: "hotDealsTodayUI",
    initialState,
    reducers: {
        setSelectedHotDealId: (state, action: PayloadAction<string | null>) => {
            state.selectedId = action.payload;
        },
        setHotDealsTodayActiveSlide: (state, action: PayloadAction<number>) => {
            state.activeSlide = action.payload;
        },
    },
});

export const {
    setSelectedHotDealId,
    setHotDealsTodayActiveSlide,
} = hotDealsTodaySlice.actions;

export default hotDealsTodaySlice.reducer;
