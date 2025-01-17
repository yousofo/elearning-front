"use client";

import { getAllUserAuthDataFromCookies } from "@/helperFunctions/cookiesManagement";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getUserData = () => {
  if (typeof window !== "undefined") {
    // const userInfo = window.localStorage.getItem('userData');
    const userInfo = getAllUserAuthDataFromCookies();
    if (userInfo?.token) return userInfo;
    else return null;
  }
  return null;
};

const userDataFromCookies = getUserData();

const initialState = {
  info: userDataFromCookies,
  basket: { data: [], status: null, error: null },
};

//fetching courses data
export const fetchUserBasket = createAsyncThunk(
  "userData/fetchUserBasket",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const data = await fetchWithCheck(
      `/api/reservations/getBasketByToken?token=${state.userData.info.token}`
    );
    console.log(data)
    return data;
  }
);

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    toggleUpdateInfo: (state, action) => {
      console.log("toggleUpdateInfo");
      state.info = action.payload;
    },
    toggleUpdateBasket: (state, action) => {
      state.basket = action.payload;
    },
    toggleSaveUserCookies: (state, action) => {
      state.basket = action.payload;
    },
    toggleResetUserData: (state) => {
      console.log("toggleResetUserData");
      return {
        info: userDataFromCookies,
        basket: { data: [], status: null, error: null },
      };;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBasket.pending, (state) => {
        state.basket.status = "loading";
      })
      .addCase(fetchUserBasket.fulfilled, (state, action) => {
        state.basket.status = "succeeded";
        state.basket.data = action.payload;
      })
      .addCase(fetchUserBasket.rejected, (state, action) => {
        state.basket.status = "failed";
        state.basket.error = action.error.message;
      });
  },
});

export const { toggleUpdateInfo, toggleUpdateBasket, toggleResetUserData ,toggleSaveUserCookies} =
  userDataSlice.actions;

export default userDataSlice.reducer;
