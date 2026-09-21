import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,

  processingChat: false,
  allChats: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.processingChat = false;
    },
  },
});

export const {
  login,
  logout,
} = userSlice.actions;

export default userSlice.reducer;