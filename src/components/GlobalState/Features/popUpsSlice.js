"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  EnlistInCourse: false,
  selectPaymentOptions: false,
  
  currentCourseToken: "",

  paymentConfirmation: { active: false, text: "", status: "success" },
  loader: { active: false, text: "" },
  isHidden: true,
};

export const popUpsSlice = createSlice({
  name: "popUps",
  initialState,
  reducers: {
    toggleEnlistInCourse: (state) => {
      return {
        ...state,
        isHidden: !state.isHidden,
        EnlistInCourse: !state.EnlistInCourse,
      };
    },
    toggleCurrentCourseToken: (state, action) => {
      state.currentCourseToken = action.payload;
    },
    openLoader: (state, action) => {
      state.loader.active = true;
      state.loader.text = action.payload;
    },
    closeLoader: (state) => {
      state.loader.active = false;
    },
    togglePaymentConfirmation: (state, action) => {
      state.isHidden = !state.isHidden
      state.paymentConfirmation.active = !state.paymentConfirmation.active
      state.paymentConfirmation.text = action.payload.text
      state.paymentConfirmation.status = action.payload.status
      console.log(state.isHidden)
    },
    toggleSelectPaymentOptions: (state, action) => {
      return {
        ...initialState,
        currentCourseToken: action.payload,
        isHidden: !state.isHidden,
        selectPaymentOptions: !state.selectPaymentOptions,
      };
    },
    resetPopUps: (state) => {
      return initialState;
    },
    // incrementByAmount: (state, action) => {
    //     state.value += action.payload;
    // }
  },
});

export const {
  toggleEnlistInCourse,
  togglePaymentConfirmation,
  toggleSelectPaymentOptions,
  openLoader,
  toggleCurrentCourseToken,
  closeLoader,
  resetPopUps,
} = popUpsSlice.actions;

export default popUpsSlice.reducer;
