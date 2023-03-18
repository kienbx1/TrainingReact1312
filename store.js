import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/slices/authSlice'
import productReducer from './redux/slices/productSlice'
import cartReducer from './redux/slices/cartSlice'
import orderReducer from './redux/slices/orderSlice'
import isActiveSideBarSlice from './redux/slices/isActiveSideBarSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    activeSideBar: isActiveSideBarSlice
  }
})

export default store
