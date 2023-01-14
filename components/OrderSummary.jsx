import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CAL_PRICE, SHIP_FEE } from '../constant/config'
import { sumTotalAmount } from '../redux/slices/cartSlice'

const OrderSummary = () => {
  const { cartTotalAmount, cartProducts } = useSelector(state => state?.cart)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    window.localStorage.setItem('cartTotalAmount', cartTotalAmount)
  }, [cartTotalAmount])

  useEffect(() => {
    if (cartProducts) {
      const sum = cartProducts.reduce((total, item) => total + (CAL_PRICE(item?.price, item?.discount)) * item?.quantity, 0)
      dispatch(sumTotalAmount(sum))
    }
  }, [cartProducts])

  const checkoutHandle = () => {
    router.push('/checkout')
  }

  return (
    <div className='flex justify-center md:justify-end mb-20'>
      <div className='bg-orange-primary p-5 md:p-10 w-[80%] md:w-[40%] rounded-md'>
        <p className='text-xl capitalize mb-5 md:mb-7 font-semibold'>tổng hóa đơn</p>
        <div className='flex max-w-full justify-between border-b border-solid border-[#dedbda] pb-4'>
          <span className='capitalize'>tạm tính:</span>
          <span>{cartTotalAmount.toLocaleString()} VND</span>
        </div>
        <div className='flex max-w-full justify-between border-b border-solid border-[#dedbda] py-4'>
          <span className='capitalize'>phí ship:</span>
          <span>{SHIP_FEE.toLocaleString()} VND</span>
        </div>
        <div className='flex max-w-full items-center justify-between border-b border-solid border-[#dedbda] py-4'>
          <span className='capitalize'>tổng tiền:</span>
          <span className='text-[#3577f0] font-semibold text-lg'>{(cartTotalAmount + SHIP_FEE).toLocaleString()} VND</span>
        </div>
        <button className='mt-5 bg-[#3577f0] p-5 w-full rounded-md text-white uppercase font-semibold md:hover:scale-105 duration-300' onClick={checkoutHandle}>thanh toán</button>
      </div>
    </div>
  )
}

export default OrderSummary
