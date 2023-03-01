import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import allCity from '../cityDb.json'
import { emailRegExp, phoneRegExp, SHIP_FEE } from '../constant/config'
import { invalidEmailMessage, invalidPhoneMessage, maxLengthMessage, minLengthMessage, requiredMessage } from '../constant/message'
import { createOrder } from '../redux/slices/orderSlice'

const FormInfoCustomer = () => {
  const [selectCity, setSelectCity] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const router = useRouter()
  console.log('FormInfoCustomer ~ router:', router)

  const dispatch = useDispatch()
  const { user } = useSelector(state => state?.auth)
  const { cartTotalAmount, cartProducts } = useSelector(state => state?.cart)

  const selectCityHandle = (e) => {
    const nameCity = e.target.value
    setSelectCity(allCity.find(city => city.Name === nameCity))
  }

  const onSubmit = (data) => {
    const { name, phoneNumber, email, city, district, address } = data
    dispatch(createOrder(
      {
        productId: cartProducts[0].id,
        quantityProduct: cartProducts[0].quantity,
        userId: user._id,
        userName: name || user.name,
        email: email || user.email,
        phone: phoneNumber,
        city: city,
        district: district,
        address: address,
        totalPrice: cartTotalAmount + SHIP_FEE
      }
    ))
    router.push(`${router.pathname}/checkout-success`)
  }

  return (
    <div className='flex-1 p-5'>
      <p className='mb-5 text-xl font-semibold capitalize'>thông tin giao hàng</p>
      <form onSubmit={handleSubmit(onSubmit)} id='formInfoOrder'>
        <div className='relative'>
          <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Tên <span className='text-red-500'>*</span></label>
          <input
            className={`px-7 h-14 border-solid border-[1px] border-[#7777] ${errors?.name ? 'mb-2' : 'mb-5'} rounded-md focus:outline-none w-full`}
            {...register('name', {
              required: requiredMessage,
              minLength: {
                value: 2,
                message: minLengthMessage.replace('value', 2)
              },
              maxLength: {
                value: 35,
                message: maxLengthMessage.replace('value', 35)
              }
            })}
          />
        </div>
        {errors?.name && <p className='text-red-500 text-sm italic mb-5'>{errors?.name.message}</p>}

        <div className='relative'>
          <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Số điện thoại <span className='text-red-500'>*</span></label>
          <input
            className={`px-7 h-14 border-solid border-[1px] border-[#7777] ${errors.phoneNumber ? 'mb-2' : 'mb-5'} rounded-md focus:outline-none w-full`}
            {...register('phoneNumber', {
              required: requiredMessage,
              pattern: {
                value: phoneRegExp,
                message: invalidPhoneMessage
              }
            })}
          />
        </div>
        {errors?.phoneNumber && <p className='text-red-500 text-sm italic mb-5'>{errors?.phoneNumber.message}</p>}

        <div className='relative'>
          <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Email <span className='text-red-500'>*</span></label>
          <input
            className={`px-7 h-14 border-solid border-[1px] border-[#7777] ${errors?.phoneNumber ? 'mb-2' : 'mb-5'} rounded-md focus:outline-none w-full`}
            {...register('email', {
              required: requiredMessage,
              pattern: {
                value: emailRegExp,
                message: invalidEmailMessage
              }
            })}
          />
        </div>
        {errors?.email && <p className='text-red-500 text-sm italic mb-5'>{errors?.email.message}</p>}

        <div className={`relative border border-solid border-[#7777] rounded-md ${errors?.city ? 'mb-2' : 'mb-5'} px-5`}>
          <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Thành phố/Tỉnh <span className='text-red-500'>*</span></label>
          <select
            className='my-5 w-full outline-none'
            {...register('city', { onChange: (e) => selectCityHandle(e), required: requiredMessage })}
          >
            <option value='' />
            {
              allCity.map((item, index) => {
                return (
                  <option key={item?.Id || index}>
                    {item?.Name || ''}
                  </option>
                )
              })
            }
          </select>
        </div>
        {errors?.city && <p className='text-red-500 text-sm italic mb-5'>{errors?.city.message}</p>}

        <div className={`relative border border-solid border-[#7777] rounded-md ${errors?.district ? 'mb-2' : 'mb-5'} px-5`}>
          <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Quận/Huyện <span className='text-red-500'>*</span></label>
          <select
            className='my-5 w-full outline-none'
            {...register('district', { required: requiredMessage })}
          >
            <option value='' />
            {
              selectCity?.Districts?.map((item, index) => {
                return (
                  <option key={item?.Id || index}>
                    {item?.Name || ''}
                  </option>
                )
              })
            }
          </select>
        </div>
        {errors?.district && <p className='text-red-500 text-sm italic mb-5'>{errors?.district.message}</p>}

        <div className='relative'>
          <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Địa chỉ <span className='text-red-500'>*</span></label>
          <input
            className={`px-7 h-14 border-solid border-[1px] border-[#7777] ${errors?.address ? 'mb-2' : 'mb-5'} rounded-md focus:outline-none w-full`}
            {...register('address', {
              required: requiredMessage,
              minLength: {
                value: 5,
                message: minLengthMessage.replace('value', 5)
              },
              maxLength: {
                value: 50,
                message: maxLengthMessage.replace('value', 50)
              }
            })}
          />
        </div>
        {errors?.address && <p className='text-red-500 text-sm italic mb-5'>{errors?.address.message}</p>}
      </form>
    </div>
  )
}

export default FormInfoCustomer
