import { createSlice } from "@reduxjs/toolkit";

export const formTypes = { edit: "EDIT", create: "CREATE" };

const initialState = {
  formType: formTypes.create,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setFormType: (state, action) => {
      state.formType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFormType } = adminSlice.actions;

export default adminSlice.reducer;
