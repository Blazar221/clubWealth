import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./feature/catSlice";

export const store = configureStore({
    reducer: {
        cat: catReducer
    }
})