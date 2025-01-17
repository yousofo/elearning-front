"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeData: {
    lazyLoader: {},
    id: 1,
    titlePlane: "",
    shortDescription: "",
    whoMe1: "",
    whoMe2: "",
    whoMe3: "",
    whoMe4: "",
    titleVideo: "",
    lVideoURL: "",
    formFile: null,
    phone: "",
    wahtsAppNumber: "",
    email: "",
    linkedinURL: "",
    googleURL: "",
    facebookURL: "",
    youtubeURL: "",
    twitterURL: "",
    instagramURL: "",
    snapchatURL: "",
  },
  preFetchedCourse: null,
};

export const dataContentSlice = createSlice({
  name: "dataContent",
  initialState,
  reducers: {
    homeData: (state, action) => {
      state.homeData = action.payload;
    },
    togglePreFetchedCourse: (state, action) => {
      state.preFetchedCourse = action.payload;
    },
  },
});

export const { homeData, togglePreFetchedCourse } = dataContentSlice.actions;

export default dataContentSlice.reducer;
