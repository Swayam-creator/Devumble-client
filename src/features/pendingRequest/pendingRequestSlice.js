import { createSlice } from "@reduxjs/toolkit";

const initialState={
    request:[],
};

const pendingSlice=createSlice({
    name:'request',
    initialState,
    reducers:{
        addPending:(state,action)=>{
        state.request=action.payload;
        },
        removeRequest:(state,action)=>{
         return null;
        },
    }
});
export const {addPending,removeRequest}=pendingSlice.actions;
export default pendingSlice.reducer;