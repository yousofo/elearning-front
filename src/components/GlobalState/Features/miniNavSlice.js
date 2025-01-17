'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
}

export const miniNavSlice = createSlice({
  name: 'miniNav',
  initialState,
  reducers: {
    toggleMiniNav: (state) => {
      state.active = !state.active
    },
    reset: (state) => {
      state.active =false
    },
  }
})

export const { toggleMiniNav, reset } = miniNavSlice.actions;

export default miniNavSlice.reducer;