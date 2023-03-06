import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./feature/catSlice";
import covidReducer from "./feature/covidSlice";

export const store = configureStore({
    reducer: {
        cat: catReducer,
        covid: covidReducer
    }
})