import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project: null,
}

export const projectSlice = createSlice({
    name: "projectDetail",
    initialState,
    reducers: {
        setProject: (state,action)=>{
            state.project = action.payload;
        }
    }
})
export const {setProject} = projectSlice.actions;
export default projectSlice.reducer;