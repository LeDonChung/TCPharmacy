import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slice/CartSlice";
import CategorySlice from "./slice/CategorySlice";

export const store = configureStore({
    reducer: {
        cart: CartSlice,
        categories: CategorySlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type Store = ReturnType<typeof store.getState>