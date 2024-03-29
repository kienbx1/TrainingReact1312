import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params) => {
    try {
      const response = await axios.get('/api/products')
      if (params === 'sale-off') {
        const productsSaleOff = response?.data?.products?.filter(product => product?.discount !== 0)
        return productsSaleOff
      }
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
      const response = await axios.get(`/api/brand/${params}`)
        .then(async res => {
          if (res) {
            const products = await axios.get(`/api/products/by-brand/${res?.data?.brand?._id}`)
            return products?.data?.products
          }
        })
      return response
    } catch (error) {
      return error
    }
  }
)

export const getBrand = createAsyncThunk(
  'products/getBrand',
  async (params) => {
    try {
      const res = await axios.get('/api/brand')
      return res?.data?.find(item => item?.slug === params)
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
  brand: {},
  detailsProduct: {}
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
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
      .addCase(getBrand.fulfilled, (state, action) => {
        return {
          ...state,
          brand: action.payload
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

export default productSlice.reducer
