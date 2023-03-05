import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cats from '../../APIs/cats';

export const fetchData = createAsyncThunk('cat/100cats', async () => {
  const response = await cats.get100Cats()
  localStorage.setItem("catData", JSON.stringify(response.data))
  return response.data;
});

const cacheData = localStorage.getItem("catData")
const initialState = {
  data: JSON.parse(cacheData) || null,
  status: cacheData ? "succeeded" : "idle",
  error: null
}

const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    removeCat: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
      localStorage.setItem("catData", JSON.stringify(state.data))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        console.log("laoding")
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { removeCat } = catSlice.actions

export default catSlice.reducer;
