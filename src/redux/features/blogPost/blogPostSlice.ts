
import { IBlogPost } from "@/types/blogPost";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface blogPostUIState {
    items: IBlogPost[];
    selectedId: string | null;
    activeSlide: number;
}

const initialState: blogPostUIState = {
    items: [],
    selectedId: null,
    activeSlide: 0,
};

const blogPostSlice = createSlice({
    name: "blogPostUI",
    initialState,
    reducers: {
        setProductCart: (state, action: PayloadAction<IBlogPost[]>) => {
            state.items = action.payload;
        },

        addProductCart: (state, action: PayloadAction<IBlogPost>) => {
            state.items.unshift(action.payload);
        },

        updateProductCart: (state, action: PayloadAction<IBlogPost>) => {
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) state.items[index] = action.payload;
        },

    },
});

export const {
    setProductCart,
    addProductCart,
} = blogPostSlice.actions;

export default blogPostSlice.reducer;
