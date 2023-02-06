import Link from 'next/link'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { BsBasket } from 'react-icons/bs'
import { FaShoppingCart } from 'react-icons/fa'

const ListProducts = (props) => {
  const clickFavoriteHandle = (item) => {}

  return (
    <>
      <div className='px-5'>
        <div className='flex items-center gap-3'>
          <div className='w-6 h-6 flex items-center justify-center rounded-[50%] bg-[#8c71db]'>
            <BsBasket className='text-white text-xs' />
          </div>
          <p className='capitalize text-[#8c71db] text-sm font-semibold'>sản phẩm của chúng tôi</p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='capitalize font-semibold text-3xl mt-3'>Khám phá các sản phẩm của chúng tôi</p>
          <div className='flex text-sm gap-4 items-center'>
            <div className='font-semibold'>Sắp xếp theo:</div>
            <select className='flex gap-2 p-4 rounded-md cursor-pointer outline-none'>
              <option>Tên</option>
              <option>Giá tăng</option>
              <option>Giá giảm</option>
            </select>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 pb-12 pt-5'>
        {
          props?.data?.length === 0
            ? (
              <div>Hiện chưa có sản phẩm nào</div>
              )
            : props?.data?.map(item => {
              return (
                <div className='relative w-full max-w-sm bg-white rounded-lg justify-self-center' key={item?.id}>
                  {
                    item?.saleOff &&
                      <div className='w-16 h-8 absolute top-8 right-4 md:-right-2 bg-[#3577f0] shadow-blueShadow rounded z-[1] flex items-center justify-center text-xs text-white'>
                        {item?.discount || ''}% Off
                      </div>
                  }
                  <div className='group/item flex flex-col justify-end items-center'>
                    <Link href={`/detail-product/${item?.id}`}>
                      <img
                        className='relative p-3 rounded-2xl md:hover:scale-105 cursor-pointer ease-linear duration-300 w-[314px] h-[314px] object-cover'
                        src={item?.image[0]}
                        alt='product image'
                      />
                    </Link>
                    <div
                      onClick={() => clickFavoriteHandle(item)}
                      className='hover:scale-125 hover:z-10 cursor-pointer mr-40 w-10 h-10 z-0 rounded-xl group-hover/item:-translate-y-10 ease-in-out duration-500 delay-150 invisible group-hover/item:visible flex flex-col justify-around items-center absolute text-black bg-white focus:text-red-500'
                    >
                      <AiFillHeart />
                    </div>
                    <button className='hover:scale-125 hover:z-10 ml-40 w-10 h-10 z-0 rounded-xl group-hover/item:-translate-y-10 ease-in-out duration-500 delay-150 group/edit invisible group-hover/item:visible flex flex-col justify-around items-center absolute text-black bg-white focus:text-red-500'>
                      <FaShoppingCart />
                    </button>
                    <Link href='/cart'>
                      <a className='hover:scale-125 hover:z-10 z-0 group-hover/item:-translate-y-10 ease-in-out duration-500 delay-150 group/edit invisible group-hover/item:visible absolute text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center capitalize'>
                        Mua ngay
                      </a>
                    </Link>
                  </div>
                  <div className='pt-3 px-10 pb-5 md:px-5 md:pb-5'>
                    <Link href={`/detail-product/${item?.id}`}>
                      <a className='px-3 block md:px-0'>
                        <h5 className='text-sm font-semibold tracking-tight text-gray-500 dark:text-white capitalize'>
                          {item?.name || 'Name Product'}
                        </h5>
                      </a>
                    </Link>
                    {
                      item?.saleOff
                        ? (
                          <div className='flex flex-col'>
                            <p className='px-3 md:px-0 font-light mt-3 text-gray-900'>{`${(item?.price - item?.price * item?.discount * 0.01).toLocaleString() || '00.00'} VND`}</p>
                            <p className='px-3 md:px-0 font-light mt-3 text-gray-400 line-through italic'>{`${item?.price.toLocaleString() || '00.00'} VND`}</p>
                          </div>
                          )
                        : (
                          <p className='px-3 md:px-0 font-light mt-3 text-gray-900'>{`${item?.price.toLocaleString() || '00.00'} VND`}</p>
                          )
                    }
                  </div>
                  <div className='px-5'>
                    {
                      item?.countInStock > 0
                        ? (
                          <p className='text-[#3577F0] pl-8 md:pl-0'>Còn hàng</p>
                          )
                        : (
                          <p className='text-[#ff497c] pl-8 md:pl-0'>Hết hàng</p>
                          )
                    }
                  </div>
                </div>
              )
            })
        }
      </div>
      <div className='border-b border-slate-200 border-solid pb-12 flex justify-center'>
        <button className='bg-[#f6f7fb] py-4 px-8 rounded-md font-semibold text-[#777777] hover:scale-105 duration-300 hover:shadow-3xl'>Tải thêm</button>
      </div>
    </>
  )
}

export default ListProducts
