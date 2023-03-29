import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setAllUsers: (state,action)=>{
            state.users = action.payload;
        }
    }
})
export const {setAllUsers} = usersSlice.actions;
export default usersSlice.reducer;