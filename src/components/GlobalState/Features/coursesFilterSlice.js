'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCards: false
}


export const coursesFilterSlice = createSlice({
  name: 'coursesFilter',
  initialState,
  reducers: {
    toggleCards: (state) => {
      state.isCards = !state.isCards
    },
    resetCoursesFilter: () => {
      return initialState
    },
  }
})

export const { toggleCards, resetCoursesFilter } = coursesFilterSlice.actions;

export default coursesFilterSlice.reducer;