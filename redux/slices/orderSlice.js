import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data) => {
    try {
      const response = await axios.post('/api/orders', data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

const initialState = {
  orders: {}
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
      })
  }
})

export default orderSlice.reducer
