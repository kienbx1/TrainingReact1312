import { isEmpty, size } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsBasket } from 'react-icons/bs'
import { FaTelegramPlane } from 'react-icons/fa'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import Error from '../../components/Error'
import CustomerServicePolicy from '../../components/layouts/body/CustomerServicePolicy'
import UserLayout from '../../components/layouts/UserLayout'
import Loading from '../../components/Loading'
import ShowProducts from '../../components/ShowProducts'
import { DEFAULT_IMAGE, emailRegExp } from '../../constant/config'
import { invalidMessage, loginToAddToCart, maximumCountInStock, outOfStockInStock, requiredMessage } from '../../constant/message'
import { addToCart } from '../../redux/slices/cartSlice'
import { getDetailsProduct, getProducts } from '../../redux/slices/productSlice'

const DetailProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { query } = useRouter()
  const { id } = query

  const [displayProduct, setDisplayProduct] = useState(0)
  const [isSelectSize, setIsSelectSize] = useState(null)
  const [isMessageSize, setIsMessageSize] = useState(false)
  const [quantityProduct, setQuantityProduct] = useState(1)

  const dispatch = useDispatch()
  const { isLoading, isError, products, detailsProduct } = useSelector(state => state?.product)
  const { user } = useSelector(state => state?.auth)

  const relatedData = products.filter(item => item?.brand === detailsProduct?.brand).filter(item => item?._id !== detailsProduct?._id)

  useEffect(() => {
    if (id) {
      dispatch(getDetailsProduct(id))
    }
  }, [id])

  useEffect(() => {
    if (size(products) === 0) {
      dispatch(getProducts(detailsProduct.brand))
    }
  }, [detailsProduct])

  const clickExtraImgHandle = (index) => {
    return setDisplayProduct(index)
  }

  const selectSizeHandle = (size) => {
    if (detailsProduct.countInStock === 0) {
      toast.error(outOfStockInStock, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      return
    }
    setIsSelectSize(size)
    setIsMessageSize(false)
  }

  const decreaseProductHandle = () => {
    if (quantityProduct > 1) {
      setQuantityProduct(prevCount => prevCount - 1)
    }
  }

  const increaseProductHandle = () => {
    if (quantityProduct < detailsProduct.countInStock) {
      setQuantityProduct(prevCount => prevCount + 1)
    } else {
      toast.error(maximumCountInStock, {
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
  }

  const inputQuantityHandle = (e) => {
    setQuantityProduct(Number(e.target.value))
  }

  const resetInfoProductAddToCart = () => {
    setQuantityProduct(1)
    setIsSelectSize(null)
  }

  const addToCartHandle = (detailsProduct) => {
    if (isSelectSize === null) {
      setIsMessageSize(true)
      return
    }
    if (isEmpty(user)) {
      toast.error(loginToAddToCart, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      return
    }
    dispatch(addToCart({
      id: detailsProduct?._id,
      name: detailsProduct?.name,
      image: detailsProduct?.image[0],
      size: isSelectSize,
      price: detailsProduct?.price,
      discount: detailsProduct?.discount,
      quantity: quantityProduct
    }))
    resetInfoProductAddToCart()
  }

  const onSubmit = (data) => {
    reset()
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }
  if (isError) {
    return (
      <Error />
    )
  }
  return (
    <>
      <ToastContainer style={{ top: 100 }} />
      <div className='bg-orange-primary'>
        <div className='space-two-side'>
          <div className='flex flex-col md:flex-row gap-10 md:gap-20 py-12'>
            <div className='flex-1 px-4 md:px-0'>
              <div className='hidden md:block w-[60%] mx-auto mt-0 mb-6 rounded-md overflow-hidden shadow-3xl'>
                <img src={detailsProduct?.image?.[displayProduct] || DEFAULT_IMAGE} alt='image product' />
              </div>
              <div className='grid grid-cols-2 md:flex gap-5'>
                {detailsProduct?.image?.map((img, index) => {
                  return (
                    <div key={index} className='hover:shadow-3xl hover:cursor-pointer' onClick={() => clickExtraImgHandle(index)}>
                      <img src={img} alt='extra image' className='hover:scale-105 duration-300' />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='flex-1 px-4 md:px-0'>
              <div className='border-b border-solid md:text-start border-[#e9e9e9]'>
                <p className='text-xl font-semibold mb-3 uppercase'>{detailsProduct?.brand || ''}</p>
                <h1 className='text-2xl leading-7 md:text-4xl font-semibold mb-2'>{detailsProduct?.name || ''}</h1>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-[6px] mb-5'>
                  {
                detailsProduct?.discount !== 0
                  ? (
                    <>
                      <p className='text-xl md:text-2xl font-medium'>{`${(detailsProduct?.price - detailsProduct?.price * detailsProduct?.discount * 0.01).toLocaleString() || '00.00'} VND`}</p>
                      <span className='text-xl md:text-2xl md:ml-3 font-medium text-gray-400 line-through'>{`${detailsProduct?.price?.toLocaleString() || '00.00'} VND`}</span>
                      <p className='text-[#3577f0] md:ml-10'>{detailsProduct?.discount?.toLocaleString() || ''}% Off</p>
                    </>
                    )
                  : (
                    <span className='text-xl md:text-2xl font-medium'>{`${detailsProduct?.price?.toLocaleString() || '00.00'} VND`}</span>
                    )
                }
                </div>
              </div>
              <p className='my-5 text-base text-[#777777]'>{detailsProduct?.description || ''}</p>
              {
                detailsProduct?.countInStock > 0
                  ? (
                    <p className='mt-2 text-xl font-medium text-[#292930]'>Tình trạng: <span className='ml-3 text-[#3577f0] text-base font-medium'>Còn hàng (<span>{detailsProduct?.countInStock}</span>)</span></p>
                    )
                  : (
                    <p className='mt-2 text-xl font-medium text-[#292930]'>Tình trạng: <span className='ml-3 text-[#ff497c] text-base font-medium'>Hết hàng</span></p>
                    )
              }
              <div className='flex gap-8 items-center my-4 md:my-2'>
                <p className='text-xl font-medium text-[#292930]'>Size:</p>
                <div className='flex gap-2 md:gap-6'>
                  {detailsProduct?.sizes?.map((size, index) => {
                    return (
                      <div key={index} className={`w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-[50%] hover:cursor-pointer hover:border hover:border-solid border-black ${isSelectSize === size ? 'bg-black' : 'bg-white'}`} onClick={() => selectSizeHandle(size)}>
                        <p className={`text-[#777] text-sm font-semibold ${isSelectSize === size ? 'text-white' : ''}`}>{size}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              {isMessageSize && <p className='text-red-500 mt-2 font-semibold'>Vui lòng chọn size</p>}
              <div className='flex flex-col mt-2 gap-11'>
                <div className='flex gap-8 items-center'>
                  <p className='text-xl font-medium text-[#292930] capitalize'>Số lượng:</p>
                  <div className='flex items-center gap-2'>
                    <div className='flex w-8 h-8 bg-white items-center justify-center rounded-[50%] cursor-pointer hover:border hover:border-solid border-black' onClick={decreaseProductHandle}><AiOutlineMinus /></div>
                    <input className='w-[50px] bg-transparent text-black text-center focus:outline-none text-xl font-medium' value={quantityProduct} onChange={inputQuantityHandle} placeholder='0' />
                    <div className='flex w-8 h-8 bg-white items-center justify-center rounded-[50%] cursor-pointer hover:border hover:border-solid border-black' onClick={increaseProductHandle}><AiOutlinePlus /></div>
                  </div>
                </div>
                <div className='py-6 px-3 w-[50%] md:w-[35%] mx-auto md:mx-0 bg-[#3577f0] rounded-md text-sm md:text-base text-center text-white capitalize font-semibold cursor-pointer md:hover:scale-105 duration-300' onClick={() => addToCartHandle(detailsProduct)}>Thêm vào giỏ hàng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='space-two-side'>
        <div className='py-12 px-4 md:px-0'>
          <div className='flex items-center gap-3'>
            <div className='w-6 h-6 flex items-center justify-center rounded-[50%] bg-[#8c71db]'>
              <BsBasket className='text-white text-xs' />
            </div>
            <p className='capitalize text-[#8c71db] text-sm font-semibold'>sản phẩm của chúng tôi</p>
          </div>
          <p className='capitalize font-semibold text-3xl mt-3'>Các sản phẩm liên quan</p>
          <ShowProducts data={relatedData} resetInfoProductAddToCart={resetInfoProductAddToCart} />
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
              <p className='text-2xl md:text-4xl font-semibold mb-3'>Nhận thông tin cập nhật hằng tuần</p>
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
      <CustomerServicePolicy />
    </>
  )
}

DetailProduct.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default DetailProduct
