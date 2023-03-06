import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import covid from '../../APIs/covid';

export const fetchData = createAsyncThunk('covid/history', async () => {
    const response = await covid.getHistoricDailyCovidStats()
    const filteredData = response.data.map((item) => {
        return {
            "date": item.date,
            "state": item.state,
            "positive": item.positive || 0,
            "probableCases": item.probableCases || 0,
        }
    })
    localStorage.setItem("covidData", JSON.stringify(filteredData))
    return filteredData;
});

const cacheData = JSON.parse(localStorage.getItem("covidData")) || []
const initialState = {
    date: 20210307,
    originData: cacheData,
    data: cacheData.filter(item => item.date == 20210307),
    status: cacheData.length > 0 ? "succeeded" : "idle",
    error: null,
}

const covidSlice = createSlice({
    name: 'covid',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload
            state.data = state.originData.filter(item => item.date == state.date)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.originData = action.payload;
                state.data = action.payload.filter(item => item.date == state.date)
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export const { setDate } = covidSlice.actions

export default covidSlice.reducer;
