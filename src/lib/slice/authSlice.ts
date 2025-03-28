"use client";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: !!localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
