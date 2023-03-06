import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: "Home"
}

const starwarsSlice = createSlice({
  name: 'starwars',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    }
  },
});
export const { setPage } = starwarsSlice.actions

export default starwarsSlice.reducer;
