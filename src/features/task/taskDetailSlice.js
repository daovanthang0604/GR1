import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: null,
}

export const taskSlice = createSlice({
    name: "taskDetail",
    initialState,
    reducers: {
        setTask: (state,action)=>{
            state.task = action.payload;
        }
    }
})
export const {setTask} = taskSlice.actions;
export default taskSlice.reducer;