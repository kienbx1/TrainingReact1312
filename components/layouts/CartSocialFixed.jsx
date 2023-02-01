import { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'

const CartSocialFixed = () => {
  const [isOpenMiniCart, setIsOpenMiniCart] = useState(false)

  const clickCartFixedHandler = () => {
    setIsOpenMiniCart(!isOpenMiniCart)
  }

  return (
    <div className='hidden md:block fixed z-[2] top-[30%] right-0'>
      <div className='w-9 h-[72px] bg-dot-active flex flex-col items-center justify-center gap-2 shadow-3xl hover:cursor-pointer' onClick={clickCartFixedHandler}>
        <p className='text-white'>1</p>
        <AiOutlineShoppingCart className='text-white' />
      </div>
      {
        isOpenMiniCart &&
          <div className='w-[300px] bg-white absolute top-0 right-9 p-3 shadow-3xl'>
            <p className='text-xs font-semibold uppercase border-b-4 border-solid'>Giỏ hàng (1)</p>
            <div className='flex py-3 border-b border-dashed gap-4'>
              <img src='/Images/Adidas/FORUM/black/display.webp' className='w-20 h-20 object-contain' />
              <div className='w-full'>
                <p className='text-xs font-semibold capitalize'>Giày Adidas cổ thấp Forum</p>
                <p className='mt-2 text-xs font-semibold'>2.000.000 VNĐ</p>
                <div className='text-xs flex justify-between'>
                  <p>Size:</p>
                  <p>38</p>
                </div>
                <div className='text-xs flex justify-between'>
                  <p>Số lượng</p>
                  <p>1</p>
                </div>
              </div>
            </div>
            <div className='flex justify-between mt-2 text-sm font-semibold'>
              <p className='capitalize'>Tổng cộng</p>
              <p className='text-dot-active'>2.000.000 VNĐ</p>
            </div>
            <p className='bg-dot-active w-[80%] mx-auto text-center p-3 uppercase font-semibold mt-3 hover:cursor-pointer'>Thanh toán</p>
          </div>
      }
      <div className='w-9 h-[110px] bg-gray-700 absolute top-[100px] text-xl text-white flex flex-col items-center justify-around shadow-3xl'>
        <a target='_blank' href='https://www.facebook.com/ThinhhTeeNii/' rel='noreferrer'><BsFacebook /></a>
        <a target='_blank' href='https://www.instagram.com/thinhhh_hhhh/' rel='noreferrer'><BsInstagram /></a>
        <a target='_blank' href='https://www.youtube.com/channel/UCXO1FQgzQ4UXSPm4-qaty-Q' rel='noreferrer'><BsYoutube /></a>
      </div>
    </div>

  )
}

export default CartSocialFixed
