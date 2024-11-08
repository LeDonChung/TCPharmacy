import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slice/CartSlice";
import CategorySlice from "./slice/CategorySlice";
import UserSlice from "./slice/UserSlice";

export const store = configureStore({
    reducer: {
        cart: CartSlice,
        categories: CategorySlice,
        user: UserSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type Store = ReturnType<typeof store.getState>