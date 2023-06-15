import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    file: null,
    filecategory: null,
}

export const folderSlice = createSlice({
    name: "taskDetail",
    initialState,
    reducers: {
        setFiles: (state,action)=>{
            state.file = action.payload;
        },
        setFileCategory: (state,action)=>{
            state.filecategory = action.payload;
        },
    }
})
export const {setFiles,setFileCategory} = folderSlice.actions;
export default folderSlice.reducer;