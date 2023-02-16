import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import data from '../../utils/db'

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const response = await data
    const productList = response?.productsList

    return productList
  }
)

export const getBrandProducts = createAsyncThunk(
  'products/getBrandProducts',
  async (brand) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const response = await data
    const productList = response?.productsList.filter(item => item?.brand === brand)

    return productList
  }
)

export const getSaleOffProducts = createAsyncThunk(
  'products/getSaleOffProducts',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const response = await data
    const productList = response?.productsList.filter(item => item?.saleOff === true)

    return productList
  }
)

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  product: {}
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(getBrandProducts.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getBrandProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })
      .addCase(getBrandProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(getSaleOffProducts.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getSaleOffProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })
      .addCase(getSaleOffProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
  }
})

export default productSlice.reducer
