import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/slices/authSlice'
import productReducer from './redux/slices/productSlice'
import cartReducer from './redux/slices/cartSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer
  }
})

export default store
