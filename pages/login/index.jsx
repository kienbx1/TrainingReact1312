import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { loginUser, resetState } from '../../redux/slices/authSlice'
import { requestAction } from '../../utils/request'
const cookies = new Cookies()

const Login = () => {
  const [typePass, setTypePass] = useState(false)
  const router = useRouter()
  const { user } = useSelector((state) => state?.auth)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const dispatch = useDispatch()

  const onSubmit = async ({ email, password }) => {
    dispatch(loginUser({ email, password }))
    if (cookies.get('token')) {
      requestAction()
    }
  }
  useEffect(() => {
    if (user.role === 'admin') {
      router.push('/admin/home')
    }
    if (user.role === 'user') {
      router.push('/')
    }
  }, [user])

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
        <div className='hidden md:block flex-[2] bg-img-login h-screen bg-no-repeat bg-cover mr-[52px]' />
        <div className='flex-[3] md:pt-9 md:pr-16'>
          <div className='flex items-center justify-center md:justify-between'>
            <Link href='/'>
              <p className='hidden md:flex items-center justify-center border border-solid border-[#7777] w-9 h-9 rounded-md'>
                <MdOutlineKeyboardArrowLeft />
              </p>
            </Link>
            <div className='flex flex-col md:flex-row mt-10 md:mt-0 gap-5 justify-end items-center'>
              <Link href='/'>
                <img
                  src='/Images/king-shoes-low-resolution-logo-black-on-transparent-background.png'
                  className='w-[120px] md:hidden mb-6'
                />
              </Link>
              <p className='text-sm'>Bạn chưa có tài khoản?</p>
              <Link href='/register'>
                <p
                  className='bg-[#ff497c] py-4 px-9 rounded-md text-white hover:text-white md:hover:scale-105 duration-300'
                  onClick={() => dispatch(resetState())}
                >
                  Đăng ký
                </p>
              </Link>
            </div>
          </div>
          <div className='px-8 pt-8 md:p-16 md:pt-24 w-full md:w-[80%]'>
            <p className='text-2xl text-center md:text-[28px] md:text-left capitalize font-semibold'>
              Đăng nhập
            </p>
            <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
              <div className='relative'>
                <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>
                  Email
                </label>
                <input
                  className={`px-7 h-14 border-solid border-[1px] border-[#7777] ${
                    errors?.email ? 'mb-2' : 'mb-5'
                  } rounded-md focus:outline-none w-full`}
                  {...register('email', {
                    required: 'Trường này không được để trống',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'Giá trị không hợp lệ'
                    }
                  })}
                  placeholder='email@gmail.com'
                />
              </div>
              {errors?.email && (
                <p className='text-red-500 text-sm italic mb-5'>
                  {errors?.email.message}
                </p>
              )}

              <div className='relative'>
                <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>
                  Mật khẩu
                </label>
                <input
                  type={typePass ? 'text' : 'password'}
                  className={`px-7 h-14 border-solid border-[1px] border-[#7777] ${
                    errors?.password ? 'mb-2' : 'mb-5'
                  } rounded-md focus:outline-none w-full`}
                  {...register('password', {
                    required: 'Trường này không được để trống'
                  })}
                  placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                />
                {typePass
                  ? (
                    <AiFillEyeInvisible
                      className='absolute text-2xl top-[20%] right-[4%] text-[#7777] cursor-pointer'
                      onClick={() => setTypePass(!typePass)}
                    />
                    )
                  : (
                    <AiFillEye
                      className='absolute text-2xl top-[20%] right-[4%] text-[#7777] cursor-pointer'
                      onClick={() => setTypePass(!typePass)}
                    />
                    )}
              </div>
              {errors?.password && (
                <p className='text-red-500 text-sm italic mb-5'>
                  {errors?.password.message}
                </p>
              )}

              <div className='flex justify-between items-center'>
                <button
                  type='submit'
                  className='text-sm md:text-base mt-5 w-[30%] bg-[#3577F0] py-4 rounded-md capitalize text-white font-semibold hover:scale-105 duration-300'
                >
                  Đăng nhập
                </button>
                <Link href='/forget-password'>
                  <p className='text-[#3577F0] text-sm duration-300'>
                    Quên mật khẩu?
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
