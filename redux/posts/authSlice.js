import { createSlice } from "@reduxjs/toolkit";
import { registerUser, logInUser, logOut } from "./authOperations.js";
import { showMessage } from "react-native-flash-message";

const initialState = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
      isAuth: true,
    }),
  },

  extraReducers: (builder) =>
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.login = payload.displayName;
        state.email = payload.email;
        state.avatar = payload.photoURL;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        showMessage({
          message: "error",
          description: `${payload}`,
          type: "error",
          duration: 2000,
          backgroundColor: "#FF6C00;",
          color: "white",
        });
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.login = payload.displayName;
        state.email = payload.email;
        state.avatar = payload.photoURL;
        state.isAuth = true;
        showMessage({
            message: "success",
            description: `Glad to see you again`,
            type: "info",
            duration: 2000,
            backgroundColor: "#6CB0F3",
            color: "white",
          });
      })
      .addCase(logInUser.rejected, (state, { payload }) => {
        showMessage({
          message: "error",
          description: `${payload}`,
          type: "error",
          duration: 2000,
          backgroundColor: "#FF6C00;",
          color: "white",
        });
      })
      .addCase(logOut.fulfilled, (state) => {
        state.userId = null;
        state.login = null;
        state.email = null;
        state.avatar = null;
        state.isAuth = false;
        showMessage({
            message: "success",
            description: `see you soon`,
            type: "info",
            duration: 2000,
            backgroundColor: "#6CB0F3",
            color: "white",
          });
      }),
});

export const { getCurrentUser } = authSlice.actions;
