import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { addToCartSuccess, productExist } from '../../constant/message'

let cartItems
let itemQuantity
let totalAmount

if (typeof window !== 'undefined') {
  cartItems = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : []
  itemQuantity = window.localStorage.getItem('cartQuantity') ? Number(window.localStorage.getItem('cartQuantity')) : 0
  totalAmount = window.localStorage.getItem('totalAmount') ? Number(window.localStorage.getItem('totalAmount')) : 0
}

const initialState = {
  cartProducts: cartItems,
  cartTotalQuantity: itemQuantity,
  cartTotalAmount: totalAmount
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.cartProducts = action.payload
    },
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
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const index = state.cartProducts.findIndex(item => item.id === id)
      if (index >= 0) {
        state.cartProducts[index].quantity = quantity
      }
    },
    removeFromCart: (state, action) => {
      const idItemRemove = action.payload
      state.cartProducts = state.cartProducts.filter(item => item.id !== idItemRemove)
      state.cartTotalQuantity -= 1

      window.localStorage.setItem('cart', JSON.stringify(state.cartProducts))
      window.localStorage.setItem('cartQuantity', state.cartTotalQuantity)
    },
    sumTotalAmount: (state, action) => {
      state.cartTotalAmount = action.payload
    }
  }
})

export const { updateCart, addToCart, resetCart, setQuantity, removeFromCart,sumTotalAmount } = cartSlice.actions
export default cartSlice.reducer
