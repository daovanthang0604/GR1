import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    error: false
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        fetchSuccess: (state,action)=>{
            state.projects = action.payload;
        },
        fetchFailure: (state) =>{
            state.error = true
        },
        updateProjects: (state, action) => {
            state.projects = action.payload;
          }
    }
})
export const {fetchSuccess,fetchFailure, updateProjects} = projectSlice.actions;
export default projectSlice.reducer;