import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:[]
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:(state,action)=>{
          state.user.push(action.payload);
        },
        removeUser:(state,action)=>{
        state.user=state.user.filter((u)=>u._id!==action.payload);
        }
    }
});

export const {addUser,removeUser}=userSlice.actions;
 
export default userSlice.reducer;