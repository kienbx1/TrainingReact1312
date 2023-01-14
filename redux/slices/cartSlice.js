import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { addToCartSuccess, productExist } from '../../constant/message'

let cartItems
let itemQuantity

if (typeof window !== 'undefined') {
  cartItems = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : []
  itemQuantity = window.localStorage.getItem('cartQuantity') ? Number(window.localStorage.getItem('cartQuantity')) : 0
}

const initialState = {
  cartProducts: cartItems,
  cartTotalQuantity: itemQuantity,
  cartTotalAmount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existProduct = state.cartProducts?.find(product => product.id === action.payload.id)
      if (existProduct) {
        toast.error(productExist, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      } else {
        state.cartProducts.push(action.payload)
        state.cartTotalQuantity += 1
        window.localStorage.setItem('cart', JSON.stringify(state.cartProducts))
        window.localStorage.setItem('cartQuantity', state.cartTotalQuantity)
        toast.success(addToCartSuccess, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    },
    resetCart: (state, action) => {
      state.cartProducts = []
      state.cartTotalQuantity = 0
      state.cartTotalAmount = 0
    }
  }
})

export const { addToCart, resetCart } = cartSlice.actions
export default cartSlice.reducer
