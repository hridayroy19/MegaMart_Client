import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import featureCategoryReducer from "./features/featureCategory/featureCategorySlice";
import flashSaleUIReducer from "./features/flashSale/flashSaleSlice";
import hotDealsTodayReducer from "./features/hotDealsToday/hotDealsTodaySlice";
import productCardUIReducer from "./features/product/productSlice";
import offerCardUIReducer from "./features/offerCard/offerCardSlice";
import featurePeoductUIReducer from "./features/featureProducts/featureProductSlice";
import sellProductUIReducer from "./features/sellsProduct/sellProductSlice";
import brandsUIReducer from "./features/brands/brandSlice";
import BlogPostUIReducer from "./features/blogPost/blogPostSlice";
import VendorProductUIReducer from "./features/vendorProduct/vendorProductSlice";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        flashSaleUI: flashSaleUIReducer,
        productCardUI: productCardUIReducer,
        featureCategory: featureCategoryReducer,
        hotDealsTodayUI: hotDealsTodayReducer,
        offerCardUI: offerCardUIReducer,
        featureProductUI: featurePeoductUIReducer,
        sellProductUI: sellProductUIReducer,
        bransUI: brandsUIReducer,
        blogPostUI: BlogPostUIReducer,
        vendorProductUI: VendorProductUIReducer,
        auth: authReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
