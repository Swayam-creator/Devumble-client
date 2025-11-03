import { createSlice } from "@reduxjs/toolkit";

const initialState={
    connections:[]
};

const connectionSlice=createSlice({
    name:'connections',
    initialState,
    reducers:{
        addConnections:(state,action)=>{
            state.connections=action.payload||[];
        }
    }
});

export  const {addConnections}=connectionSlice.actions;
export default connectionSlice.reducer