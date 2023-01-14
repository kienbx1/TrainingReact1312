import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { invalidEmailMessage, maxLengthMessage, minLengthMessage, passwordRuleMessage, requiredMessage } from '../../constant/message'
import { signUpUser } from '../../redux/slices/authSlice'

const Register = () => {
  const [typePass, setTypePass] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const dispatch = useDispatch()
  const { registerStatus } = useSelector(state => state?.auth)

  const onSubmit = ({ name, email, password }) => {
    dispatch(signUpUser({ name, email, password }))
  }

  useEffect(() => {
    if (registerStatus === 'success') {
      reset()
    }
  }, [registerStatus])

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <div className='flex'>
        <div className='hidden md:block flex-[2] bg-img-register h-screen bg-no-repeat bg-center bg-cover mr-[52px]' />
        <div className='flex-[3] md:pt-9 md:pr-16'>
          <div className='flex flex-col md:flex-row mt-6 md:mt-0 gap-5 justify-end items-center'>
            <img src='/Images/king-shoes-low-resolution-logo-black-on-transparent-background.png' className='w-[120px] md:hidden mb-6' />
            <p className='text-sm'>Bạn đã có tài khoản?</p>
            <Link href='/login'>
              <p className='bg-[#ff497c] py-4 px-9 rounded-md text-white hover:text-white hover:scale-105 duration-300'>Đăng nhập</p>
            </Link>
          </div>
          <div className='px-8 pt-8 md:p-16 md:pt-24 w-full md:w-[80%]'>
            <p className='text-2xl text-center md:text-[28px] md:text-left capitalize font-semibold'>Đăng ký</p>
            <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
              <div className='relative'>
                <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Tên</label>
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
                  placeholder='Name'
                />
              </div>
              {errors?.name && <p className='text-red-500 text-sm italic mb-5'>{errors?.name.message}</p>}

              <div className='relative'>
                <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Email</label>
                <input
                  className={`px-7 h-14 border-solid border-[1px] border-[#7777] ${errors?.email ? 'mb-2' : 'mb-5'} rounded-md focus:outline-none w-full`}
                  {...register('email', {
                    required: requiredMessage,
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: invalidEmailMessage
                    }
                  })}
                  placeholder='Email@gmail.com'
                />
              </div>
              {errors?.email && <p className='text-red-500 text-sm italic mb-5'>{errors?.email.message}</p>}

              <div className='relative'>
                <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Mật khẩu</label>
                <input
                  type={typePass ? 'text' : 'password'}
                  className={`px-7 h-14 border-solid border-[1px] border-[#7777] ${errors?.password ? 'mb-2' : 'mb-5'} rounded-md focus:outline-none w-full`}
                  {...register('password', {
                    required: requiredMessage,
                    minLength: {
                      value: 6,
                      message: minLengthMessage.replace('value', 6)
                    },
                    pattern: {
                      value: /[0-9]/,
                      message: passwordRuleMessage.replace('value', '1')
                    }
                  })}
                  placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                />
                {
                  typePass
                    ? (
                      <AiFillEyeInvisible className='absolute text-2xl top-[20%] right-[4%] text-[#7777] cursor-pointer' onClick={() => setTypePass(!typePass)} />
                      )
                    : (
                      <AiFillEye className='absolute text-2xl top-[20%] right-[4%] text-[#7777] cursor-pointer' onClick={() => setTypePass(!typePass)} />
                      )
                }
              </div>
              {errors?.password && <p className='text-red-500 text-sm italic mb-5'>{errors?.password.message}</p>}

              <div className='flex justify-center md:justify-start items-center'>
                <button type='submit' className='text-sm md:text-base mt-5 w-[30%] bg-[#3577F0] py-4 rounded-md capitalize text-white font-semibold hover:scale-105 duration-300'>đăng ký</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
