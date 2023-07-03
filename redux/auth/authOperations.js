import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (newUserData, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUserData.email,
        newUserData.password
      );

      await updateProfile(auth.currentUser, {
        displayName: newUserData.login,
        photoURL: newUserData.avatar,
      });

      const { uid, displayName, email, photoURL } = auth.currentUser;
      console.log("currentUser", uid, displayName, email, photoURL);
      return { uid, displayName, email, photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const { uid, displayName, email, photoURL } = user;

      return { uid, displayName, email, photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (updateUserAvatar, { rejectWithValue }) => {
    try {

      await updateProfile(auth.currentUser, {
        photoURL: updateUserAvatar,
      });

      const { photoURL } = auth.currentUser;

      return { photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);