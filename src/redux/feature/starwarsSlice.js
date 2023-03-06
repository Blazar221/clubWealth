import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import starwars from '../../APIs/starwars';

export const fetchPeopleData = createAsyncThunk('starwars/getPeople', async () => {
    const response = await starwars.getPeople()
    localStorage.setItem("peopleData", JSON.stringify(response))
    return response;
});
export const fetchPlanetsData = createAsyncThunk('starwars/getPlanets', async () => {
    const response = await starwars.getPlanets()
    localStorage.setItem("planetsData", JSON.stringify(response))
    return response;
});
export const fetchStarshipsData = createAsyncThunk('starwars/getStarships', async () => {
    const response = await starwars.getStarships()
    localStorage.setItem("starshipsData", JSON.stringify(response))
    return response;
});

const cachePeopleData = JSON.parse(localStorage.getItem("peopleData")) || []
const cachePlanetsData = JSON.parse(localStorage.getItem("planetsData")) || []
const cacheStarshipsData = JSON.parse(localStorage.getItem("starshipsData")) || []
const initialState = {
    page: "Home",
    data: null,
    peopleData: cachePeopleData,
    planetsData: cachePlanetsData,
    starshipsData: cacheStarshipsData,
    peopleStatus: cachePeopleData.length > 0 ? "succeeded" : "idle",
    planetsStatus: cachePlanetsData.length > 0 ? "succeeded" : "idle",
    starshipsStatus: cacheStarshipsData.length > 0 ? "succeeded" : "idle",
    error: null
}

const starwarsSlice = createSlice({
    name: 'starwars',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
            debugger
            if (action.payload === "People") {
                state.data = state.peopleData
            } else if (action.payload === "Planets") {
                state.data = state.planetsData
            } else if (action.payload === "Starships") {
                state.data = state.starshipsData
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPeopleData.pending, (state) => {
                state.peopleStatus = 'loading';
            })
            .addCase(fetchPeopleData.fulfilled, (state, action) => {
                state.peopleStatus = 'succeeded';
                state.peopleData = action.payload;
            })
            .addCase(fetchPeopleData.rejected, (state, action) => {
                state.peopleStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchPlanetsData.pending, (state) => {
                state.planetsStatus = 'loading';
            })
            .addCase(fetchPlanetsData.fulfilled, (state, action) => {
                state.planetsStatus = 'succeeded';
                state.planetsData = action.payload;
            })
            .addCase(fetchPlanetsData.rejected, (state, action) => {
                state.planetsStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchStarshipsData.pending, (state) => {
                state.starshipsStatus = 'loading';
            })
            .addCase(fetchStarshipsData.fulfilled, (state, action) => {
                state.starshipsStatus = 'succeeded';
                state.starshipsData = action.payload;
            })
            .addCase(fetchStarshipsData.rejected, (state, action) => {
                state.starshipsStatus = 'failed';
                state.error = action.error.message;
            });
    },
});
export const { setPage } = starwarsSlice.actions

export default starwarsSlice.reducer;
