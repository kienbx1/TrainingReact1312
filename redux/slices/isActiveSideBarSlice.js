import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActive: '/admin/home'
}

export const isActiveSideBarSlice = createSlice({
  name: 'activeSideBar',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.isActive = action.payload
    }
  }
})

export const { addTask } = isActiveSideBarSlice.actions
export const selectActiveSideBar = (state) => state.activeSideBar.isActive
export default isActiveSideBarSlice.reducer
