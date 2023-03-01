import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data) => {
    try {
      const response = await axios.post('/api/orders', data)
      console.log('response:', response)

      return response
    } catch (error) {
      console.log('error:', error.response)

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
