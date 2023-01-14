import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'

const ListProducts = (props) => {
  const router = useRouter()

  const clickFavoriteHandle = (item) => {}

  return (
    <>
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
                  {
                    item?.isNew &&
                      <div className='w-16 h-8 absolute top-[72px] right-4 md:-right-2 bg-red-400 shadow-redShadow rounded z-[1] flex items-center justify-center text-xs text-white'>
                        Mới
                      </div>
                  }
                  <div className='group cursor-pointer'>
                    <div className='relative'>
                      <Link href={`/detail-product/${item?.id}`}>
                        <img
                          className='relative p-3 rounded-2xl md:group-hover:scale-105 ease-linear duration-300 w-[314px] h-[314px] object-cover mx-auto md:mx-0'
                          src={item?.image[0]}
                          alt='product image'
                        />
                      </Link>
                      <div className='hidden md:flex w-[200px] gap-2 justify-center left-2/4 -translate-x-1/2 bottom-3 absolute invisible opacity-0 duration-500 group-hover:bottom-8 group-hover:opacity-100 group-hover:visible group-hover:delay-200'>
                        <div
                          onClick={() => clickFavoriteHandle(item)}
                          className='add__favorite bg-white w-10 h-10 rounded-md'
                        >
                          <i className='icon__favorite flex justify-center items-center bg-white w-10 h-10 rounded-md'>
                            <AiOutlineHeart />
                          </i>
                        </div>
                        <Link href='/cart'>
                          <a className='bg-[#ff497c] flex items-center p-2 rounded-md text-white text-sm capitalize font-semibold hover:scale-110 hover:text-white duration-300'>
                            Mua ngay
                          </a>
                        </Link>
                        <div className='add__cart bg-white w-10 h-10 rounded-md'>
                          <i className='icon__cart flex justify-center items-center bg-white w-10 h-10 rounded-md'>
                            <AiOutlineShoppingCart />
                          </i>
                        </div>
                      </div>
                    </div>
                    <div className='pt-3 px-10 pb-5 md:px-5 md:pb-5'>
                      <Link href={`/detail-product/${item?.id}`}>
                        <a className='px-3 block md:px-0'>
                          <h5 className='text-sm font-semibold tracking-tight text-gray-500 dark:text-white capitalize'>
                            {item?.name || ''}
                          </h5>
                        </a>
                      </Link>
                      {
                        item?.saleOff
                          ? (
                            <div className='flex flex-col'>
                              <p className='px-3 md:px-0 font-light mt-3 text-gray-900'>{`${(item?.price - item?.price * item?.discount * 0.01).toLocaleString() || ''} VND`}</p>
                              <p className='px-3 md:px-0 font-light mt-3 text-gray-400 line-through italic'>{`${item?.price.toLocaleString() || ''} VND`}</p>
                            </div>
                            )
                          : (
                            <p className='px-3 md:px-0 font-light mt-3 text-gray-900'>{`${item?.price.toLocaleString() || ''} VND`}</p>
                            )
                      }

                      {
                        item?.countInStock > 0
                          ? (
                            <p className='text-[#3577F0] pl-3 md:pl-0 mt-2'>Còn hàng</p>
                            )
                          : (
                            <div className='flex justify-between'>
                              <p className='text-[#ff497c] pl-3 md:pl-0 mt-2'>Hết hàng</p>
                              {
                                item?.isNew && <p className='font-semibold text-red-400 mt-2'>Mới</p>
                              }
                            </div>
                            )
                      }
                    </div>
                  </div>
                </div>
              )
            })
        }
      </div>
      {
        router.pathname !== '/' &&
          <div className='border-b border-slate-200 border-solid pb-12 flex justify-center'>
            <button className='bg-[#f6f7fb] py-4 px-8 rounded-md font-semibold text-[#777777] hover:scale-105 duration-300 hover:shadow-3xl'>Tải thêm</button>
          </div>
      }
    </>
  )
}

export default ListProducts
