import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../features/user/userSlice";
import  profileSliceReducer from "../features/profile/profileSlice"
import feedSliceReducer from "../features/feed/feedSlice";
const store=configureStore({
    reducer:{
      user:userSliceReducer,
      profile:profileSliceReducer,
      feed: feedSliceReducer,
    }
});

export default store;
