import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cats from '../../APIs/cats';

export const fetchData = createAsyncThunk('cat/100cats', async () => {
  const response = await cats.get100Cats()
  localStorage.setItem("catData", JSON.stringify(response.data))
  return response.data;
});

const cacheData = JSON.parse(localStorage.getItem("catData")) || []
const initialState = {
  originData: cacheData,
  data: cacheData,
  curPageData: cacheData.slice(0, Math.min(3, cacheData.length)),
  curPage: 0,
  pages: Math.max(Math.ceil(cacheData.length / 3), 1),
  status: cacheData.length > 0 ? "succeeded" : "idle",
  error: null
}

const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    removeCat: (state, action) => {
      state.originData = state.originData.filter(item => item.id !== action.payload);
      state.data = state.data.filter(item => item.id !== action.payload);
      state.curPageData = state.data.slice(3 * state.curPage, Math.min(state.data.length, 3 * (state.curPage + 1)))
      state.pages = Math.max(Math.ceil(state.data.length / 3), 1);

      localStorage.setItem("catData", JSON.stringify(state.data))
    },
    setPage: (state, action) => {
      state.curPage = action.payload
      state.curPageData = state.data.slice(3 * state.curPage, Math.min(state.data.length, 3 * (state.curPage + 1)))
      state.pages = Math.max(Math.ceil(state.data.length / 3), 1);
    },
    searchCat: (state, action) => {
      debugger
      state.data = state.originData.filter(item => item.id.includes(action.payload))
      state.curPage = 0
      state.curPageData = state.data.slice(3 * state.curPage, Math.min(state.data.length, 3 * (state.curPage + 1)))
      state.pages = Math.max(Math.ceil(state.data.length / 3), 1);
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
        state.data = action.payload;
        state.curPageData = state.data.slice(3 * state.curPage, Math.min(state.data.length, 3 * (state.curPage + 1)));
        state.pages = Math.max(Math.ceil(state.data.length / 3), 1);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { removeCat, setPage, searchCat } = catSlice.actions

export default catSlice.reducer;
