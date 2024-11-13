import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slice/CartSlice";
import CategorySlice from "./slice/CategorySlice";
import UserSlice from "./slice/UserSlice";
import BannerSlice from "./slice/BannerSlice";
import BrandSlice from "./slice/BrandSlice";
import ProductSlice from "./slice/ProductSlice";
import TagGroupSlice from "./slice/TagGroupSlice";

export const store = configureStore({
    reducer: {
        cart: CartSlice,
        categories: CategorySlice,
        user: UserSlice,
        banner: BannerSlice,
        brand: BrandSlice,
        product: ProductSlice,
        tagGroup: TagGroupSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type Store = ReturnType<typeof store.getState>