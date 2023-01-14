import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { invalidEmailMessage } from '../../constant/errorMessage'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
  }

  return (
    <div className='flex'>
      <div className='hidden md:block flex-[2] bg-img-forget-password h-screen bg-no-repeat bg-center bg-cover mr-[52px]' />
      <div className='flex-[3] md:pt-9 md:pr-16'>
        <div className='flex flex-col md:flex-row mt-6 md:mt-0 gap-5 justify-end items-center'>
          <img src='/Images/king-shoes-low-resolution-logo-black-on-transparent-background.png' className='w-[120px] md:hidden mb-6' />
          <p className='text-sm'>Bạn đã có tài khoản?</p>
          <Link href='/login'>
            <p className='bg-[#ff497c] py-4 px-9 rounded-md text-white hover:text-white hover:scale-105 duration-300'>Đăng nhập</p>
          </Link>
        </div>
        <div className='px-8 pt-6 md:p-16 md:pt-24 w-full md:w-[80%]'>
          <p className='text-2xl text-center md:text-[28px] md:text-left capitalize font-semibold capitalize'>Quên mật khẩu</p>
          <p className='text-sm text-[#777] mt-5'>Nhập địa chỉ email bạn dùng đăng ký tài khoản, chúng tôi sẽ gửi mã xác nhận để reset mật khẩu của bạn</p>
          <form className='mt-10' onSubmit={handleSubmit(onSubmit)}>
            <div className='relative'>
              <label className='absolute -top-2 bg-white text-sm font-semibold left-5 text-[#777] px-2'>Email</label>
              <input
                className={`px-7 h-14 border-solid border-[1px] border-[#7777] ${errors?.email ? 'mb-2' : 'mb-5'} rounded-md focus:outline-none w-full`}
                {...register('email', {
                  required: 'Trường này không được để trống',
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: invalidEmailMessage
                  }
                })}
                placeholder='gmail@gmail.com'
              />
            </div>
            {errors?.email && <p className='text-red-500 text-sm italic mb-5'>{errors?.email.message}</p>}

            <div className='flex justify-center md:justify-start items-center'>
              <button type='submit' className='text-sm md:text-base mt-5 w-[30%] bg-[#3577F0] py-4 rounded-md capitalize text-white font-semibold hover:scale-105 duration-300 capitalize'>Gửi mã reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
