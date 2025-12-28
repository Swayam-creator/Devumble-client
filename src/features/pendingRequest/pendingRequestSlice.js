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
         const newArr=state?.filter((req)=>req._id!==action.payload);
         return newArr;
        },
    }
});
export const {addPending,removeRequest}=pendingSlice.actions;
export default pendingSlice.reducer;