import { useForm } from 'react-hook-form'
import { FaTelegramPlane } from 'react-icons/fa'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { emailRegExp } from '../constant/config'
import { invalidEmailMessage, requiredMessage } from '../constant/message'

const FormReceivedWeekly = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    reset()
  }

  return (
    <div className='space-two-side'>
      <div className=''>
        <div className='bg-img-newsletter px-5 py-10 md:py-[140px] md:px-[100px] rounded-md'>
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
                        message: invalidEmailMessage
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
  )
}

export default FormReceivedWeekly
