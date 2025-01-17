'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
}

export const coursesNavSlice = createSlice({
  name: 'coursesNav',
  initialState,
  reducers: {
    toggleCoursesNav: (state) => {
      state.active = !state.active
    },
    resetCoursesNav: (state) => {
      state.active =false
    },
  }
})

export const { toggleCoursesNav, resetCoursesNav } = coursesNavSlice.actions;

export default coursesNavSlice.reducer;