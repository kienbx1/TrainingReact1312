import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { DEFAULT_IMAGE } from '../../constant/config'

const SocialFixed = () => {
  const [isOpenMiniCart, setIsOpenMiniCart] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [productsInMiniCart, setProductsInMiniCart] = useState([])

  const { cartProducts, cartTotalAmount, cartTotalQuantity } = useSelector(state => state?.cart)

  useEffect(() => {
    setTotalAmount(cartTotalAmount)
    setTotalQuantity(cartTotalQuantity)
    setProductsInMiniCart(cartProducts)
  }, [cartProducts, cartTotalAmount, cartTotalQuantity])

  const clickCartFixedHandler = () => {
    setIsOpenMiniCart(!isOpenMiniCart)
  }

  return (
    <div className='hidden md:block fixed z-[2] top-[30%] right-0'>
      <div className='w-9 h-[72px] bg-dot-active flex flex-col items-center justify-center gap-2 shadow-3xl hover:cursor-pointer' onClick={clickCartFixedHandler}>
        <p className='text-white'>{totalQuantity}</p>
        <AiOutlineShoppingCart className='text-white' />
      </div>
      {
        isOpenMiniCart &&
          <div className='mini__cart w-[300px] max-h-[470px] bg-white absolute top-0 right-9 p-3 shadow-3xl'>
            <div onClick={clickCartFixedHandler}>
              <p className='text-xs font-semibold uppercase border-b-4 border-solid'>Giỏ hàng ({totalQuantity})</p>
              <div className='max-h-[300px] overflow-y-scroll'>
                {
                productsInMiniCart?.map(product => {
                  return (
                    <div className='flex py-3 border-b border-dashed gap-4' key={product?.id}>
                      <img src={product?.images || DEFAULT_IMAGE} className='w-20 h-20 object-contain' />
                      <div className='w-full'>
                        <p className='text-xs font-semibold capitalize'>{product?.name || ''}</p>
                        <p className='mt-2 text-xs font-semibold'>{product?.price.toLocaleString() || ''} VNĐ</p>
                        <div className='text-xs flex justify-between'>
                          <p>Size:</p>
                          <p>{product?.size || ''}</p>
                        </div>
                        <div className='text-xs flex justify-between'>
                          <p>Số lượng</p>
                          <p>{product?.quantity || ''}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              </div>
              <div className='flex justify-between mt-2 text-sm font-semibold'>
                <p className='capitalize'>Tổng cộng</p>
                <p className='text-dot-active'>{totalAmount.toLocaleString()} VNĐ</p>
              </div>
            </div>
            <Link href='/cart'>
              <p className='bg-dot-active w-[80%] block mx-auto text-center p-3 uppercase font-semibold mt-3 hover:cursor-pointer'>Thanh toán</p>
            </Link>
          </div>
      }
      <div className='w-9 h-[110px] bg-gray-700 absolute top-[100px] text-xl text-white flex flex-col items-center justify-around shadow-3xl'>
        <a target='_blank' href='https://www.facebook.com/ThinhhTeeNii/' rel='noreferrer'><BsFacebook /></a>
        <a target='_blank' href='https://www.instagram.com/thinhhh_hhhh/' rel='noreferrer'><BsInstagram /></a>
        <a target='_blank' href='https://www.youtube.com/channel/UCXO1FQgzQ4UXSPm4-qaty-Q' rel='noreferrer'><BsYoutube /></a>
      </div>
      {
        isOpenMiniCart && <div className='w-screen h-screen absolute right-0 -top-[320%] -z-[1]' onClick={clickCartFixedHandler} />
      }
    </div>

  )
}

export default SocialFixed
