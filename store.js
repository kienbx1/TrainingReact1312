import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/slices/authSlice'
import productReducer from './redux/slices/productSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer
  }
})

export default store
