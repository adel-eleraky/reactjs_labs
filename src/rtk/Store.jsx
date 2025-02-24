import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthSlice";
import CartSlice from "./features/CartSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        cart: CartSlice
    },
});

export default store;