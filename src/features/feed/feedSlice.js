import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addtoFeed: (state, action) => {
      
      state.feed = action.payload;
    },
    removeFromFeed: (state, action) => {
    
      state.feed = state.feed.filter((u) => u._id !== action.payload._id);
    },
  },
});

export const { addtoFeed, removeFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
