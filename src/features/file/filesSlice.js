import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    files: [],
    error: false, 
    newUpdate: null
}

export const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        fetchFilesSuccess: (state,action)=>{
            state.files = action.payload;
        },
        fetchFilesFailure: (state) =>{
            state.error = true
        },
        updateFiles: (state, action) => {
            state.newUpdate = action.payload;
          }
    }
})
export const {fetchFilesSuccess,fetchFilesFailure, updateFiles} = fileSlice.actions;
export default fileSlice.reducer;