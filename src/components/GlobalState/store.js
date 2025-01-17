"use client";

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/authSlice";
import dataContentSlice from "./Features/dataContentSlice";
import navListSlice from "./Features/navListSlice";
import popUpsSlice from "./Features/popUpsSlice";
import miniNavSlice from "./Features/miniNavSlice";
import coursesNavSlice from "./Features/coursesNavSlice";
import coursesFilterSlice from "./Features/coursesFilterSlice";
import userDataSlice from "./Features/userData";

export const store = configureStore({
  reducer: {
    dataContent: dataContentSlice,
    auth: authSlice,
    navList: navListSlice,
    miniNav: miniNavSlice,
    popUps: popUpsSlice,
    userData: userDataSlice,
    coursesNav: coursesNavSlice,
    coursesFilter: coursesFilterSlice,
  },
});
