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
            if (action.payload === "People") {
                state.data = state.peopleData
            } else if (action.payload === "Planets") {
                state.data = state.planetsData
            } else if (action.payload === "Starships") {
                state.data = state.starshipsData
            }
        },
        search: (state, action) => {
            state.page = "Search"
            const tmp = []
            state.peopleData.map(item => {
                const ts = JSON.stringify(item)
                if (ts.includes(action.payload))
                    tmp.push(item)
            })
            state.planetsData.map(item => {
                const ts = JSON.stringify(item)
                if (ts.includes(action.payload))
                    tmp.push(item)
            })
            state.starshipsData.map(item => {
                const ts = JSON.stringify(item)
                if (ts.includes(action.payload))
                    tmp.push(item)
            })
            state.data = tmp
        },
        sortData: (state, action) => {
            if (action.payload == 0) {
                state.data?.sort()
            } else if (action.payload === 1) {
                state.data?.sort((a, b) => a.name.localeCompare(b.name))
            } else {
                state.data?.sort((a, b) => a.name.localeCompare(b.name)).reverse()
            }
        },
        remove: (state, action) => {
            state.peopleData = state.peopleData.filter(item => item.name !== action.payload);
            localStorage.setItem("peopleData", JSON.stringify(state.peopleData))
            state.planetsData = state.planetsData.filter(item => item.name !== action.payload);
            localStorage.setItem("planetsData", JSON.stringify(state.planetsData))
            state.starshipsData = state.starshipsData.filter(item => item.name !== action.payload);
            localStorage.setItem("starshipsData", JSON.stringify(state.starshipsData))

            state.data = state.data.filter(item => item.name !== action.payload);
        },
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
export const { setPage, search, sortData, remove } = starwarsSlice.actions

export default starwarsSlice.reducer;
