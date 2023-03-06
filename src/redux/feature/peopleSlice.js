import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import starwars from '../../APIs/starwars';

export const fetchPeopleData = createAsyncThunk('starwars/getPeople', async () => {
  const response = await starwars.getPeople()
  localStorage.setItem("peopleData", JSON.stringify(response.data))
  return response.data;
});

const cacheData = JSON.parse(localStorage.getItem("peopleData")) || []
const initialState = {
  data: cacheData,
  status: cacheData.length > 0 ? "succeeded" : "idle",
  error: null
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeopleData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPeopleData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPeopleData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
// export const { removepeople, setPage, searchpeople, sortpeople } = peopleSlice.actions

export default peopleSlice.reducer;
