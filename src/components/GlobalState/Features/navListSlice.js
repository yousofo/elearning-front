'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  miniNav:false
}

export const navListSlice = createSlice({
  name: 'navList',
  initialState,
  reducers: {
    toggleNavList: (state) => {
      state.active = !state.active
    },
    toggleMiniNav: (state) => {
      state.miniNav = !state.miniNav
    },
    reset: (state) => {
      state.active =false
    },
  }
})

export const { toggleNavList,toggleMiniNav, reset } = navListSlice.actions;

export default navListSlice.reducer;