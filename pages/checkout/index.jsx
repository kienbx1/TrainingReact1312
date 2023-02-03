import { useState } from 'react'
import { useForm } from 'react-hook-form'

import allCity from '../../cityDb.json'
import SubCustomerServicePolicy from '../../components/layouts/body/SubCustomerServicePolicy'
import UserLayout from '../../components/layouts/UserLayout'
import { phoneRegExp, emailRegExp } from '../../constant/config'
import { requiredMessage, invalidMessage, minLengthMessage, maxLengthMessage } from '../../constant/errorMessage'

const Checkout = () => {
  const [selectCity, setSelectCity] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const selectCityHandle = (e) => {
    const nameCity = e.target.value
    setSelectCity(allCity.find(city => city.Name === nameCity))
  }

  const onSubmit = (data) => {
    reset()
  }

  return (
    <>
      <div className='space-two-side'>
        <div className='flex flex-col md:flex-row px-4 md:px-0 my-10 gap-5'>
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
                      message: minLengthMessage(2)
                    },
                    maxLength: {
                      value: 35,
                      message: maxLengthMessage(35)
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
                      message: invalidMessage
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
                      message: invalidMessage
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
                      message: minLengthMessage(5)
                    },
                    maxLength: {
                      value: 50,
                      message: maxLengthMessage(50)
                    }
                  })}
                />
              </div>
              {errors?.address && <p className='text-red-500 text-sm italic mb-5'>{errors?.address.message}</p>}
            </form>
          </div>
          <div className='flex-1 p-10 pt-10 bg-orange-primary rounded-md'>
            <p className='text-xl font-semibold capitalize mb-5'>đơn hàng</p>
            <div className='bg-white px-10 rounded-md mb-3'>
              <div className='flex justify-between border-b border-solid border-[#7777] pt-10 pb-5 text-lg font-semibold'>
                <p>Sản phẩm</p>
                <p>Tổng</p>
              </div>
              <div className='flex justify-between border-b border-solid border-[#7777] py-5 gap-5'>
                <p className='flex-[2] text-sm'>Giày nike <span>x1</span></p>
                <p className='flex-1 text-sm text-right'>1200000 VND</p>
              </div>
              <div className='flex justify-between border-b border-solid border-[#7777] py-5 gap-5'>
                <p className='flex-[2] text-sm'>Giày nike <span>x1</span></p>
                <p className='flex-1 text-sm text-right'>1200000 VND</p>
              </div>
              <div className='flex justify-between border-b border-solid border-[#7777] py-5 text-sm font-semibold'>
                <p>Tạm tính</p>
                <p>2400000 VND</p>
              </div>
              <div className='py-5 border-b border-solid border-[#7777]'>
                <div className='flex justify-between text-sm mb-3'>
                  <p>Phương thức giao hàng</p>
                  <p>30000 VND</p>
                </div>
                <div className='flex gap-3 mb-1'>
                  <input id='normal' name='feeDelivery' type='radio' className='hover:cursor-pointer' checked />
                  <label htmlFor='normal' className='text-sm hover:cursor-pointer'>Bình thường</label>
                </div>
                <div className='flex gap-3'>
                  <input id='express' name='feeDelivery' type='radio' className='hover:cursor-pointer' />
                  <label htmlFor='express' className='text-sm hover:cursor-pointer'>Nhanh</label>
                </div>
              </div>
              <div className='flex justify-between pb-10 pt-5 text-lg font-semibold'>
                <p>Tổng</p>
                <p>2430000 VND</p>
              </div>
            </div>
            <button type='submit' value='Submit' form='formInfoOrder' className='mt-5 w-full bg-[#3577F0] py-4 rounded-md uppercase text-white font-semibold hover:scale-105 duration-300'>Gửi</button>
          </div>
        </div>
      </div>
      <SubCustomerServicePolicy />
    </>
  )
}

Checkout.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}

export default Checkout
