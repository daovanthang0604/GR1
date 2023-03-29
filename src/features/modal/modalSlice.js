import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {}
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalId } = action.payload;
      if (!state.modals) {
        state.modals = {};
      }
      state.modals[modalId] = true;
    },
    closeModal: (state, action) => {
      const { modalId } = action.payload;
      if (!state.modals) {
        state.modals = {};
      }
      state.modals[modalId] = false;
    }
  }
});
export const isModalOpen = (state, modalId) => state.modals?.[modalId] || false;
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
