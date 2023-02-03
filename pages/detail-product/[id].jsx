import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsBasket } from 'react-icons/bs'
import { FaTelegramPlane } from 'react-icons/fa'
import { HiOutlineMailOpen } from 'react-icons/hi'

import SubCustomerServicePolicy from '../../components/layouts/body/SubCustomerServicePolicy'
import UserLayout from '../../components/layouts/UserLayout'
import ListProducts from '../../components/ListProducts'
import Toast from '../../components/Toast'
import { emailRegExp } from '../../constant/config'
import { invalidMessage, requiredMessage } from '../../constant/errorMessage'
import data from '../../utils/db'

const DetailProduct = () => {
  const { query } = useRouter()
  const { id } = query
  const product = data?.productsList?.find(item => item?.id === Number(id))

  const [displayProduct, setDisplayProduct] = useState(0)
  const [isSelectSize, setIsSelectSize] = useState(null)
  const [isMessageSize, setIsMessageSize] = useState(false)
  const [quantityProduct, setQuantityProduct] = useState(1)
  const [showToast, setShowToast] = useState('')
  const [, setInfoProductAddToCart] = useState({
    brand: '',
    name: '',
    id: null,
    size: null,
    quantity: 0
  })
  const relatedData = data.productsList.filter(item => item?.brand === product?.brand).filter(item => item?.id !== product?.id)

  const clickExtraImgHandler = (index) => {
    return setDisplayProduct(index)
  }

  const selectSizeHandler = (size) => {
    setIsSelectSize(size)
    setIsMessageSize(false)
    setShowToast('')
  }

  const decreaseProductHandler = () => {
    if (quantityProduct !== 0) {
      setQuantityProduct(prevCount => prevCount - 1)
    }
  }

  const increaseProductHandler = () => {
    setQuantityProduct(prevCount => prevCount + 1)
  }

  const inputQuantityHandler = (e) => {
    setQuantityProduct(Number(e.target.value))
  }

  const resetInfoProductAddToCart = () => {
    setQuantityProduct(1)
    setIsSelectSize(null)
  }

  const addToCartHandler = () => {
    if (isSelectSize === null) {
      setIsMessageSize(true)
    }
    if (isSelectSize && quantityProduct) {
      setInfoProductAddToCart(
        {
          brand: product.brand,
          name: product.name,
          id: product.id,
          size: isSelectSize,
          quantity: quantityProduct
        }
      )
      setShowToast('success')
      resetInfoProductAddToCart()
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    reset()
  }

  return (
    <>
      {
        showToast === 'success' && <Toast title='Đã thêm vào giỏ hàng' setShowToast={setShowToast} />
      }
      <div className='bg-orange-primary'>
        <div className='space-two-side'>
          <div className='flex flex-col md:flex-row gap-10 md:gap-20 py-12'>
            <div className='flex-1 px-4 md:px-0'>
              <div className='hidden md:block w-[60%] mx-auto mt-0 mb-6 rounded-md overflow-hidden shadow-3xl'>
                <img src={product?.image[displayProduct]} alt='image product' />
              </div>
              <div className='grid grid-cols-2 md:flex gap-5'>
                {product?.image?.map((img, index) => {
                  return (
                    <div key={index} className='hover:shadow-3xl hover:cursor-pointer' onClick={() => clickExtraImgHandler(index)}>
                      <img src={img} alt='extra image' className='hover:scale-105 duration-300' />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='flex-1 px-4 md:px-0'>
              <div className='border-b border-solid text-center md:text-start border-[#e9e9e9]'>
                <p className='text-xl font-semibold mb-3 uppercase'>{product?.brand || ''}</p>
                <h1 className='text-[28px] md:text-4xl font-semibold mb-2'>{product?.name || ''}</h1>
                <div className='flex items-center gap-[6px] mb-5'>
                  {
                product?.saleOff
                  ? (
                    <>
                      <span className='text-xl md:text-2xl font-medium'>{`${(product?.price - product?.price * product?.discount * 0.01).toLocaleString() || '00.00'} VND`}</span>
                      <span className='text-xl md:text-2xl ml-3 font-medium text-gray-400 line-through'>{`${product?.price.toLocaleString() || '00.00'} VND`}</span>
                      <span className='text-[#3577f0] ml-10'>{product?.discount.toLocaleString() || ''}% Off</span>
                    </>
                    )
                  : (
                    <span className='text-xl md:text-2xl font-medium'>{`${product?.price.toLocaleString() || '00.00'} VND`}</span>
                    )
                }
                </div>
              </div>
              <p className='mt-5 text-base text-[#3577f0]'>Mã sản phẩm: <span className='ml-3 text-black font-semibold'>{product?.id || ''}</span></p>
              <p className='mt-2 text-base text-[#3577f0]'>Mô tả: <span className='ml-3 text-black font-semibold'>{product?.desc || ''}</span></p>
              {
                product?.countInStock > 0
                  ? (
                    <p className='mt-2 text-base text-[#3277f0]'>Tình trạng: <span className='ml-3 text-black font-semibold'>Còn hàng</span></p>
                    )
                  : (
                    <p className='mt-2 text-base text-[#3577f0]'>Tình trạng: <span className='ml-3 text-black font-semibold'>Hết hàng</span></p>
                    )
              }
              <div className='flex gap-8 items-start md:items-center mt-2'>
                <p className='text-base text-[#3577f0]'>Size:</p>
                <div className='flex gap-2 md:gap-6'>
                  {product?.sizes?.map((size, index) => {
                    return (
                      <div key={index} className={`w-11 h-11 flex items-center justify-center bg-white rounded-[50%] hover:cursor-pointer hover:border hover:border-solid border-black ${isSelectSize === size ? 'bg-black' : ''}`} onClick={() => selectSizeHandler(size)}>
                        <p className={`text-[#777] font-semibold ${isSelectSize === size ? 'text-white' : ''}`}>{size}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              {isMessageSize && <p className='text-red-500 mt-2 font-semibold'>Vui lòng chọn size</p>}
              <div className='flex flex-col mt-2 gap-11'>
                <div className='flex gap-8 items-center'>
                  <p className='text-base text-[#3577f0] capitalize'>Số lượng:</p>
                  <div className='flex items-center gap-2'>
                    <div className='flex w-8 h-8 bg-white items-center justify-center rounded-[50%] cursor-pointer hover:border hover:border-solid border-black' onClick={decreaseProductHandler}><AiOutlineMinus /></div>
                    <input className='w-[50px] bg-transparent text-black text-center focus:outline-none text-xl font-semibold' value={quantityProduct} onChange={inputQuantityHandler} placeholder='0' />
                    <div className='flex w-8 h-8 bg-white items-center justify-center rounded-[50%] cursor-pointer hover:border hover:border-solid border-black' onClick={increaseProductHandler}><AiOutlinePlus /></div>
                  </div>
                </div>
                <div className='flex gap-10 justify-center md:justify-start'>
                  <div className='p-6 bg-[#3577f0] rounded-md text-sm md:text-base text-white capitalize font-semibold cursor-pointer md:hover:scale-105 duration-300' onClick={addToCartHandler}>Thêm vào giỏ hàng</div>
                  <Link href='/checkout'>
                    <a className='p-6 bg-[#ff497c] rounded-md text-sm md:text-base text-white capitalize font-semibold cursor-pointer md:hover:text-white hover:scale-105 duration-300'>Mua ngay</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='space-two-side'>
        <div className='py-12 px-4 md:px-0'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='w-6 h-6 bg-[#9571db] rounded[50%] flex items-center justify-center'>
              <BsBasket className='text-white' />
            </div>
            <p className='capitalize text-sm font-semibold text-[#9571db]'>Các sản phẩm liên quan</p>
          </div>
          <ListProducts data={relatedData} />
        </div>
      </div>
      <div className='space-two-side'>
        <div className='pb-12'>
          <div className='bg-img-newsletter bg-no-repeat px-5 py-10 md:py-[140px] md:px-[100px] rounded-md'>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-6 h-6 bg-[#3577f0] rounded-[50%] flex items-center justify-center'>
                  <HiOutlineMailOpen className='text-white' />
                </div>
                <p className='text-[#3577f0] font-semibold capitalize text-sm'>Tin tức</p>
              </div>
              <p className='text-4xl font-semibold mb-3'>Nhận thông tin cập nhật hằng tuần</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col md:flex-row w-full md:w-[50%] gap-3 mt-9'>
                  <div className='flex-[2] bg-white flex px-6 py-5 rounded-md gap-3'>
                    <FaTelegramPlane className='text-xl' />
                    <input
                      className='w-full focus:outline-none'
                      {...register('email', {
                        required: requiredMessage,
                        pattern: {
                          value: emailRegExp,
                          message: invalidMessage
                        }
                      })}
                      placeholder='example@gmail.com'
                    />
                  </div>
                  <button type='submit' className='flex-1 bg-[#3879f0] w-[40%] md:w-full p-5 rounded-md text-white capitalize font-semibold md:hover:scale-105 duration-300'>Đăng ký</button>
                </div>
                {errors?.email && <p className='text-red-500 text-sm italic mt-3'>{errors?.email.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <SubCustomerServicePolicy />
    </>
  )
}

DetailProduct.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default DetailProduct
