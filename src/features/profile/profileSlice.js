import { createSlice } from "@reduxjs/toolkit";

const initialState={
    profile:null
}

const profileSlice=createSlice({
  name:'profile',
  initialState,
  reducers:{
    addUser:(state,action)=>{
        state.profile=action.payload
    }

  }
});

export const {addUser}=profileSlice.actions;
export default profileSlice.reducer;

