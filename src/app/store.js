import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSliceReducer from "../features/user/userSlice";
import  profileSliceReducer from "../features/profile/profileSlice"
import feedSliceReducer from "../features/feed/feedSlice";
import requestReducer from "../features/pendingRequest/pendingRequestSlice"
import connectionReducer from "../features/connections/ConnectionSlice"

// combine root reducer
const rootreducer=combineReducers({
      user:userSliceReducer,
      profile:profileSliceReducer,
      feed: feedSliceReducer,
      request:requestReducer,
      connections:connectionReducer
})

// now create persist config
const persistConfig={
  key:'root',
  storage,
  whitelist:['user','profile']
}
// wrapping the reducers
const persistedReducer= persistReducer(persistConfig,rootreducer)
export const store=configureStore({
    reducer:persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

