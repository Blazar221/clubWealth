import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import covid from '../../APIs/covid';

export const fetchData = createAsyncThunk('covid/history', async () => {
    const response = await covid.getCurrentCovidStats()
    localStorage.setItem("covidData", JSON.stringify(response.data))
    
    return response.data;
});

// const cacheData = JSON.parse(localStorage.getItem("covidData")) || []
const cacheData = []
const initialState = {
    date: 20210307,
    data: cacheData.filter(item => item.date == date),
    status: cacheData.length > 0 ? "succeeded" : "idle",
    error: null,
}

const covidSlice = createSlice({
    name: 'covid',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                debugger
                state.data = action.payload.filter(item => item.date == state.date)
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default covidSlice.reducer;
