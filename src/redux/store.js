import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./feature/catSlice";
import covidReducer from "./feature/covidSlice";
import peopleReducer from "./feature/peopleSlice";
import starwarsReducer from "./feature/starwarsSlice";

export const store = configureStore({
    reducer: {
        cat: catReducer,
        covid: covidReducer,
        people: peopleReducer,
        starwars: starwarsReducer,
    }
})