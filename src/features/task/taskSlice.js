import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    error: false
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        fetchSuccess: (state,action)=>{
            state.tasks = action.payload;
        },
        fetchFailure: (state) =>{
            state.error = false
        },
        updateTasks: (state, action) => {
            state.tasks = action.payload;
          }
    }
})
export const {fetchSuccess,fetchFailure, updateTasks} = taskSlice.actions;
export default taskSlice.reducer;