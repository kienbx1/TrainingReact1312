import { BsCheckLg } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

const Toast = (props) => {
  const closeToastHandler = () => {
    props.setShowToast('')
  }

  return (
    <>
      <div className='toast fixed border-l-[5px] border-l-green-500 border-solid top-[16%] right-0 max-w-[30%] mx-auto mr-7 bg-white p-8 pr-11 rounded-md shadow-3xl'>
        <div className='flex items-center gap-7'>
          <MdClose className='absolute top-[10px] right-[10px] hover:cursor-pointer' onClick={closeToastHandler} />
          <div className='w-6 h-6 flex items-center justify-center'>
            <BsCheckLg className='text-2xl text-green-500' />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold text-green-500'>Thành công! </p>
            <p className='font-semibold text-gray-500'>{props.title || ''}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Toast
