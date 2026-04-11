import { IVendorProducts } from "@/types/vendor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VendorProductUIState {
  items: IVendorProducts[];
  searchTerm: string;
  selectedCategory: string | null;
  currentPage: number;
}

const initialState: VendorProductUIState = {
  items: [],
  searchTerm: "",
  selectedCategory: null,
  currentPage: 1,
};

const vendorProductUISlice = createSlice({
  name: "vendorProductUI",
  initialState,
  reducers: {
    setVendorProducts: (state, action: PayloadAction<IVendorProducts[]>) => {
      state.items = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.selectedCategory = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = "";
      state.selectedCategory = null;
      state.currentPage = 1;
    },
  },
});

export const {
  setVendorProducts,
  setSearchTerm,
  setSelectedCategory,
  setCurrentPage,
  resetFilters,
} = vendorProductUISlice.actions;

export default vendorProductUISlice.reducer;
