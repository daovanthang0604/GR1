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
        }
    }
})
export const {fetchSuccess,fetchFailure} = taskSlice.actions;
export default taskSlice.reducer;