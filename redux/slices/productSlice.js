import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    try {
      const response = await axios.get('/api/products')
      return response?.data.products
    } catch (error) {
      return error
    }
  }
)

export const getProductsBrand = createAsyncThunk(
  'products/getProductsBrand',
  async (params) => {
    try {
      const response = axios.get(`/api/brand/${params}`)
        .then(async res => {
          if (res) {
            console.log("res:", res)
            const products = await axios.get(`/api/products/by-brand/${res?.data?.brand?._id}`)
            console.log("products:", products?.data?.products)
            return products?.data?.products
          }
        })
      return response
    } catch (error) {
      return error
    }
  }
)

export const getDetailsProduct = createAsyncThunk(
  'products/getDetailsProduct',
  async (id) => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      return response
    } catch (error) {
      return error.response
    }
  }
)

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  detailsProduct: {}
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetState: (state, action) => {
      return {
        ...state,
        detailsProduct: {}
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          isError: false
        }
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            products: action.payload,
            isLoading: false
          }
        } else {
          return {
            ...state,
            isLoading: false,
            isError: true
          }
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        return {
          ...state,
          isError: true
        }
      })
      .addCase(getProductsBrand.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          isError: false
        }
      })
      .addCase(getProductsBrand.fulfilled, (state, action) => {
        console.log(".addCase ~ action:", action)
        if (action.payload) {
          return {
            ...state,
            products: action.payload,
            isLoading: false
          }
        } else {
          return {
            ...state,
            isLoading: false,
            isError: true
          }
        }
      })
      .addCase(getProductsBrand.rejected, (state, action) => {
        return {
          ...state,
          isError: true
        }
      })
      .addCase(getDetailsProduct.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          isError: false
        }
      })
      .addCase(getDetailsProduct.fulfilled, (state, action) => {
        if (action.payload?.status === 200) {
          return {
            ...state,
            detailsProduct: action.payload?.data?.products,
            isLoading: false
          }
        } else {
          return {
            ...state,
            isLoading: false,
            isError: true
          }
        }
      })
      .addCase(getDetailsProduct.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      })
  }
})

export const { resetState } = productSlice.actions
export default productSlice.reducer
