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
            "death": item.death || 0
        }
    })
    localStorage.setItem("covidData", JSON.stringify(filteredData))
    debugger
    return filteredData;
});

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
                state.data = action.payload.filter(item => item.date == state.date)
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default covidSlice.reducer;
