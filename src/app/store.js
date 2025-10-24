import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../features/user/userSlice";
import  profileSliceReducer from "../features/profile/profileSlice"
import feedSliceReducer from "../features/feed/feedSlice";
import requestReducer from "../features/pendingRequest/pendingRequestSlice"
import connectionReducer from "../features/connections/ConnectionSlice"
const store=configureStore({
    reducer:{
      user:userSliceReducer,
      profile:profileSliceReducer,
      feed: feedSliceReducer,
      request:requestReducer,
      connections:connectionReducer
    }
});

export default store;
