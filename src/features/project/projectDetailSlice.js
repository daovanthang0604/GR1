import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project: null,
    membersInProject: null
}

export const projectSlice = createSlice({
    name: "projectDetail",
    initialState,
    reducers: {
        setProject: (state,action)=>{
            state.project = action.payload;
        },
        setMembers: (state,action)=>{
            state.membersInProject = action.payload;
        }
    }
})
export const {setProject,setMembers} = projectSlice.actions;
export default projectSlice.reducer;