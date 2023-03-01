import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/slices/authSlice'
import productReducer from './redux/slices/productSlice'
import cartReducer from './redux/slices/cartSlice'
import orderReducer from './redux/slices/orderSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer
  }
})

export default store
