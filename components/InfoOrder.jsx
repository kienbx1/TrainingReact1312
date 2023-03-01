import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { CAL_PRICE, SHIP_FEE } from '../constant/config'

const InfoOrder = () => {
  const [listProductsInCart, setListProductsInCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const { cartProducts, cartTotalAmount } = useSelector(state => state?.cart)

  useEffect(() => {
    setTotalAmount(cartTotalAmount)
  }, [cartTotalAmount])

  useEffect(() => {
    setListProductsInCart(cartProducts)
  }, [cartProducts])

  return (
    <div className='flex-1 p-10 pt-10 bg-orange-primary rounded-md'>
      <p className='text-xl font-semibold capitalize mb-5'>đơn hàng</p>
      <div className='bg-white px-10 rounded-md mb-3'>
        <div className='flex justify-between border-b border-solid border-[#7777] pt-10 pb-5 text-lg font-semibold'>
          <p>Sản phẩm</p>
          <p>Tổng</p>
        </div>
        {
          listProductsInCart?.map((product) => {
            return (
              <div className='flex flex-col md:flex-row items-start justify-between border-b border-solid border-[#7777] py-5 gap-5' key={product?.id}>
                <p className='flex-[2] text-sm'>{product?.name || ''} <span>(x{product?.quantity || ''})</span></p>
                <p className='flex-1 text-sm text-right'>{(CAL_PRICE(product?.price, product?.discount) * product?.quantity).toLocaleString() || ''} VND</p>
              </div>
            )
          })
        }
        <div className='flex justify-between border-b border-solid border-[#7777] py-5 text-sm font-semibold'>
          <p>Tạm tính</p>
          <p>{totalAmount.toLocaleString()} VND</p>
        </div>
        <div className='flex justify-between text-sm mb-3 mt-5'>
          <p>Phí giao hàng</p>
          <p>{SHIP_FEE.toLocaleString()} VND</p>
        </div>
        <div className='flex justify-between pb-10 pt-5 text-lg font-semibold'>
          <p>Tổng</p>
          <p>{(totalAmount + SHIP_FEE).toLocaleString()} VND</p>
        </div>
      </div>
      <div className='flex justify-center'>
        <button type='submit' value='Submit' form='formInfoOrder' className='mt-5 w-[70%] bg-[#3577F0] py-5 rounded-md uppercase text-white font-semibold hover:scale-105 duration-300'>Gửi</button>
      </div>
    </div>
  )
}

export default InfoOrder
