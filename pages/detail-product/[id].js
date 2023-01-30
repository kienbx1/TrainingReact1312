import { useFormik } from 'formik'
import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsBasket } from 'react-icons/bs'
import { FaTelegramPlane } from 'react-icons/fa'
import { HiOutlineMailOpen } from 'react-icons/hi'
import * as Yup from 'yup'

import SubCustomerServicePolicy from '../../components/layouts/body/SubCustomerServicePolicy'
import UserLayout from '../../components/layouts/UserLayout'
import ListProducts from '../../components/ListProducts'
import Toast from '../../components/Toast'

const infoProduct = {
  branch: 'Nike',
  name: 'Air Jordan VIP',
  price: 200,
  saleOff: true,
  discount: 12,
  id: 1,
  imgDisplay: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
  extraImg: [
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_2.webp',
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_3.webp',
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_4.jpg',
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_5.jpg',
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_6.webp'
  ],
  sizes: [39, 40, 41, 42, 43, 44]
}

const datas = [
  {
    name: 'giay nike',
    price: 200,
    id: 1,
    saleOff: true,
    discount: 12,
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    branch: 'nike'
  },
  {
    name: 'giay nike',
    price: 200,
    id: 4,
    saleOff: false,
    discount: 0,
    image: '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp',
    branch: 'nike'
  },
  {
    name: 'giay nike',
    price: 200,
    id: 7,
    saleOff: false,
    discount: 0,
    image: '/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_1.webp',
    branch: 'nike'
  }
]

const relatedData = datas.filter(item => item.id !== infoProduct.id)

const DetailProduct = () => {
  const [displayProduct, setDisplayProduct] = useState(infoProduct?.imgDisplay)
  const [isSelectSize, setIsSelectSize] = useState(null)
  const [isMessageSize, setIsMessageSize] = useState(false)
  const [quantityProduct, setQuantityProduct] = useState(1)
  const [showToast, setShowToast] = useState('')
  const [, setInfoProductAddToCart] = useState({
    branch: '',
    name: '',
    id: null,
    size: null,
    quantity: 0
  })

  const clickExtraImgHandler = (img) => {
    return setDisplayProduct(img)
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
          branch: infoProduct.branch,
          name: infoProduct.name,
          id: infoProduct.id,
          size: isSelectSize,
          quantity: quantityProduct
        }
      )
      setShowToast('success')
      resetInfoProductAddToCart()
    }
  }

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Please enter a valid email').required('Required')
    })
  })

  return (
    <>
      {
        showToast === 'success' && <Toast title='Đã thêm vào giỏ hàng' setShowToast={setShowToast} />
      }
      <div className='bg-orange-primary'>
        <div className='space-two-side'>
          <div className='flex gap-5 py-12'>
            <div className='flex-1'>
              <div className='w-[60%] mx-auto mt-0 mb-6 rounded-md overflow-hidden shadow-3xl'>
                <img src={displayProduct} alt='image product' />
              </div>
              <div className='flex gap-5'>
                {infoProduct?.extraImg?.map((img, index) => {
                  return (
                    <div key={index} className='hover:shadow-3xl hover:cursor-pointer' onClick={() => clickExtraImgHandler(img)}>
                      <img src={img} alt='extra image' className='hover:scale-105 duration-300' />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='flex-1'>
              <div className='border-b border-solid border-[#e9e9e9]'>
                <p className='text-xl font-semibold mb-3'>{infoProduct?.branch}</p>
                <h1 className='text-4xl font-semibold mb-2'>{infoProduct?.name}</h1>
                <div className='flex items-center gap-[6px] mb-5'>
                  {
                infoProduct?.saleOff
                  ? (
                    <>
                      <span className='text-2xl font-medium'>${(infoProduct?.price - infoProduct?.price * infoProduct?.discount * 0.01).toFixed(2) || '00.00'}</span>
                      <span className='text-2xl ml-3 font-medium text-gray-400 line-through'>${infoProduct?.price || '00.00'}</span>
                      <span className='text-[#3577f0] ml-10'>{infoProduct?.discount}% Off</span>
                    </>
                    )
                  : (
                    <span className='text-2xl font-medium'>${infoProduct?.price || '00.00'}</span>
                    )
                }
                </div>
              </div>
              <p className='mt-5 text-base text-[#3577f0]'>Mã sản phẩm: <span className='ml-3 font-semibold'>{infoProduct?.id}</span></p>
              <div className='flex gap-8 items-center mt-10'>
                <p className='text-xl font-semibold'>Size:</p>
                <div className='flex gap-6'>
                  {infoProduct?.sizes?.map((size, index) => {
                    return (
                      <div key={index} className={`w-11 h-11 flex items-center justify-center bg-white rounded-[50%] hover:cursor-pointer hover:border hover:border-solid hover:duration-500 ${isSelectSize === size ? 'bg-[#777]' : ''}`} onClick={() => selectSizeHandler(size)}>
                        <p className={`text-[#777] font-semibold ${isSelectSize === size ? 'text-white' : ''}`}>{size}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              {isMessageSize && <p className='text-red-500 mt-2 font-semibold'>Vui lòng chọn size</p>}
              <div className='flex flex-col mt-7 gap-11'>
                <div className='flex gap-8 items-center'>
                  <p className='text-xl font-semibold capitalize'>Số lượng:</p>
                  <div className='flex items-center gap-2'>
                    <div className='flex w-8 h-8 bg-white items-center justify-center rounded-[50%] cursor-pointer' onClick={decreaseProductHandler}><AiOutlineMinus /></div>
                    <input className='w-[50px] bg-transparent text-center focus:outline-none text-xl font-semibold' value={quantityProduct} onChange={inputQuantityHandler} placeholder='0' />
                    <div className='flex w-8 h-8 bg-white items-center justify-center rounded-[50%] cursor-pointer' onClick={increaseProductHandler}><AiOutlinePlus /></div>
                  </div>
                </div>
                <div className='p-6 bg-[#3577f0] rounded-md text-white uppercase font-semibold cursor-pointer mx-auto hover:scale-105 duration-300' onClick={addToCartHandler}>Thêm vào giỏ hàng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='space-two-side'>
        <div className='py-12'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='w-6 h-6 bg-[#9571db] rounded[50%] flex items-center justify-center'>
              <BsBasket className='text-white' />
            </div>
            <p className='capitalize text-sm font-semibold text-[#9571db]'>Các sản phẩm liên quan</p>
          </div>
          <ListProducts datas={relatedData} />
        </div>
      </div>
      <div className='space-two-side'>
        <div className='pb-12'>
          <div className='bg-img-newsletter py-[140px] px-[100px] rounded-md'>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-6 h-6 bg-[#3577f0] rounded-[50%] flex items-center justify-center'>
                  <HiOutlineMailOpen className='text-white' />
                </div>
                <p className='text-[#3577f0] font-semibold capitalize text-sm'>Tin tức</p>
              </div>
              <p className='text-4xl font-semibold mb-3'>Nhận thông tin cập nhật hằng tuần</p>
              <form onSubmit={formik.handleSubmit}>
                <div className='flex w-[50%] gap-3 mt-9'>
                  <div className={`flex-[2] bg-white flex px-6 py-5 rounded-md gap-3 ${formik.errors.email ? 'outline outline-red-500' : ''}`}>
                    <FaTelegramPlane className='text-xl' />
                    <input
                      className='w-full focus:outline-none'
                      id='email'
                      type='email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='example@gmail.com'
                    />
                  </div>
                  <button type='submit' className='flex-1 bg-[#3879f0] rounded-md text-white capitalize font-semibold hover:scale-105 duration-300'>Đăng ký</button>
                </div>
                {formik.errors.email && formik.touched.email && <p className='mt-2 ml-5 text-red-500 font-semibold'>{formik.errors.email}</p>}
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
