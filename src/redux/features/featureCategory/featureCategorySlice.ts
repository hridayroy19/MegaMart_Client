
import { IFeatureCategory } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FeatureCategoryState = {
    items: IFeatureCategory[];
    selectedId: string | null;
};

const initialState: FeatureCategoryState = {
    items: [],
    selectedId: null,
};

const featureCategorySlice = createSlice({
    name: "featureCategory",
    initialState,
    reducers: {
        setFeatureCategories: (state, action: PayloadAction<IFeatureCategory[]>) => {
            state.items = action.payload;
        },

        addFeatureCategory: (state, action: PayloadAction<IFeatureCategory>) => {
            state.items.unshift(action.payload);
        },

        updateFeatureCategory: (state, action: PayloadAction<IFeatureCategory>) => {
            const index = state.items.findIndex(
                (item) => item._id === action.payload._id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },

        removeFeatureCategory: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },

        setSelectedFeatureCategory: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.selectedId = action.payload;
        },
    },
});

export const {
    setFeatureCategories,
    addFeatureCategory,
    updateFeatureCategory,
    removeFeatureCategory,
    setSelectedFeatureCategory,
} = featureCategorySlice.actions;

export default featureCategorySlice.reducer;
