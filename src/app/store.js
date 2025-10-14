import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../features/user/userSlice";
const store=configureStore({
    reducer:{
      user:userSliceReducer,
    }
});

export default store;
