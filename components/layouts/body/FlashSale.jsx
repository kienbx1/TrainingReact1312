import Link from 'next/link'
import { AiOutlineNotification } from 'react-icons/ai'

import data from '../../../utils/db'
import CountdownFlashSale from '../../CountdownFlashSale'

const FlashSale = () => {
  return (
    <div className='xl:px-28 lg:px-24 md:px-16 sm:px-0 pb-10 md:pb-12 md:pt-24'>
      <div className='flex flex-col md:flex-row bg-[#eceff1] p-10 md:p-16 rounded'>
        <div className='flex flex-col items-center md:items-start gap-2 md:gap-0 justify-center flex-1 pl-4'>
          <div className='flex gap-3 items-center text-dot-active font-semibold text-[14px] mb-3'>
            <div className='w-6 h-6 rounded-[50%] bg-dot-active flex items-center justify-center'>
              <AiOutlineNotification className='text-white' />
            </div>
            <p>Đừng bỏ lỡ!!</p>
          </div>
          <div className='text-2xl md:text-5xl font-semibold mb-8'>
            <h1>Giảm Giá Sốc</h1>
            <h1 className='flex items-center gap-1 md:gap-3'>Lên Đến <span className='text-2xl md:text-7xl text-red-500'>{data?.productFlashSale?.discount || ''}%</span></h1>
          </div>
          <div className='mb-10'>
            <CountdownFlashSale time={data?.productFlashSale?.time || ''} />
          </div>
          <Link href={`/detail-product/${data?.productFlashSale?.id}`}>
            <p className='px-8 py-4 rounded-md capitalize bg-[#3577f0] cursor-pointer font-semibold text-white hover:text-white hover:scale-110 duration-300'>Xem sản phẩm</p>
          </Link>
        </div>
        <div className='flex-1'>
          <img src={data?.productFlashSale?.image} className='w-[450px]' />
        </div>
      </div>
    </div>
  )
}

export default FlashSale
