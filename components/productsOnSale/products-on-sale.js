import React, { useState } from 'react'
import {
  FaEye,
  FaShoppingCart,
  FaCheck,
  FaDotCircle,
  FaWindowClose
} from 'react-icons/fa'

const ProductsOnSale = () => {
  const [showModal, setShowModal] = useState(false)
  const [countProduct, setCountProduct] = useState(1)
  const handleIncreaseProduct = () => {
    setCountProduct((countProduct) => countProduct + 1)
  }
  const handleDecreaseProduct = () => {
    setCountProduct((countProduct) => countProduct - 1)
  }

  return (
    <div>
      {showModal
        ? (
          <>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-2 mx-auto max-w-3xl'>
                {/* Content */}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/* Header */}
                  <div className='flex items-center justify-between p-2 border-b border-solid border-slate-200 rounded-t'>
                    <h3 className='text-xl font-semibold flex items-center'>
                      Air Jordan XXXVII SP
                    </h3>
                    <button
                      className='p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => setShowModal(false)}
                    >
                      <span className='z-50 text-black h-3 w-6 text-2xl block outline-none focus:outline-none '>
                        <FaWindowClose className='hover:text-red-500 focus:text-red-500' />
                      </span>
                    </button>
                  </div>
                  {/* Body */}
                  <div className='relative p-6 flex flex-col xl:flex-row md:flex-row sm:flex-col'>
                    <div>
                      <img
                        className='w-fit h-auto rounded-2xl '
                        src='./Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp'
                        alt='product image'
                      />
                    </div>
                    <div className='flex flex-col ml-3'>
                      <p className='text-black text-2xl font-bold'>
                        Air Jordan XXXVII SP
                      </p>
                      <p className='text-black text-3xl font-medium mt-8'>
                        $599.00 - $620.00
                      </p>
                      <div className='flex flex-col mt-5'>
                        <div className='flex '>
                          <FaCheck className='text-blue-400' />
                          <p className='text-blue-400 ml-2'>In stock</p>
                        </div>
                        <div className='flex mt-3'>
                          <FaCheck className='text-blue-400' />
                          <p className='text-blue-400 ml-2'>
                            Free delivery available
                          </p>
                        </div>
                        <div className='flex mt-3'>
                          <FaCheck className='text-blue-400' />
                          <p className='text-blue-400 ml-2'>
                            Sales 30% Off Use Code: MOTIVE30
                          </p>
                        </div>
                        <div className='max-w-xs mt-4'>
                          <p className='text-slate-700 leading-6 indent-1'>
                            You've got the hops and the speed—lace up in shoes
                            that enhance what you bring to the court. The latest
                            AJ is all about takeoffs and landings
                          </p>
                        </div>
                        <div />
                        <div className='flex mt-6'>
                          <p className='font-bold text-black'>Colors: </p>
                          <div>
                            <FaDotCircle className='text-green-800 ml-3 hover:scale-125' />
                          </div>
                        </div>
                        <div className='flex mt-6 justify-between'>
                          <p className='font-bold mr-5 w-10 h-7 flex flex-col items-center justify-around'>
                            Size:
                          </p>
                          <div className='focus:border-solid hover:border-solid border-2 rounded-xl cursor-pointer w-10 h-7  flex flex-col items-center justify-around'>
                            <p className='font-normal text-slate-600'>
                              XS
                            </p>
                          </div>
                          <div className='focus:border-solid hover:border-solid border-2 rounded-xl cursor-pointer w-10 h-7  flex flex-col items-center justify-around'>
                            <p className='font-normal text-slate-600'>S</p>
                          </div>
                          <div className='focus:border-solid hover:border-solid border-2 rounded-xl cursor-pointer w-10 h-7  flex flex-col items-center justify-around'>
                            <p className='font-normal text-slate-600'>M</p>
                          </div>
                          <div className='focus:border-solid hover:border-solid border-2 rounded-xl cursor-pointer w-10 h-7  flex flex-col items-center justify-around'>
                            <p className='font-normal text-slate-600'>L</p>
                          </div>
                          <div className='focus:border-solid hover:border-solid border-2 rounded-xl cursor-pointer w-10 h-7  flex flex-col items-center justify-around'>
                            <p className='font-normal text-slate-600'>XL</p>
                          </div>
                        </div>
                        <div className='flex mt-7'>
                          <button
                            className={
                              countProduct <= 0
                                ? 'hidden'
                                : 'w-7 h-7 rounded-full bg-slate-300 focus:bg-slate-500 text-xl'
                            }
                            onClick={handleDecreaseProduct}
                          >
                            -
                          </button>
                          <p className='ml-5 mr-5 flex items-center text-xl'>
                            {countProduct}
                          </p>
                          <button
                            className='w-7 h-7 rounded-full bg-slate-300 focus:bg-slate-500 text-xl'
                            onClick={handleIncreaseProduct}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className='flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => setShowModal(false)}
                    >
                      Add To Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black' />
          </>
          )
        : null}
      <div className='grid xl:grid-cols-4 gap-4 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-2 flex-col justify-center'>
        <div className='w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
          <div className='group/item flex flex-col justify-end items-center'>
            <img
              className='relative p-3 rounded-2xl hover:-translate-y-3 ease-in-out duration-300'
              src='./Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp'
              alt='product image'
            />
            <button
              onClick={() => setShowModal(!showModal)}
              className='hover:scale-125 hover:z-10 mr-40 w-10 h-10 z-0 rounded-xl group-hover/item:-translate-y-10 ease-in-out duration-300  group/edit invisible group-hover/item:visible flex flex-col justify-around items-center  absolute text-black bg-white focus:text-red-500'
            >
              <FaEye />
            </button>
            <button className='hover:scale-125 hover:z-10 ml-40 w-10 h-10 z-0 rounded-xl group-hover/item:-translate-y-10 ease-in-out duration-300  group/edit invisible group-hover/item:visible flex flex-col justify-around items-center  absolute text-black bg-white focus:text-red-500'>
              <FaShoppingCart />
            </button>
            <button className='hover:scale-125 hover:z-10 z-0 group-hover/item:-translate-y-10 ease-in-out duration-300  group/edit invisible group-hover/item:visible  absolute text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
              Add to cart
            </button>
          </div>
          <div className='px-5 pb-5'>
            <a href='#'>
              <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                Air Jordan XXXVII SP
              </h5>
            </a>
            <div className='flex items-center mt-2.5 mb-5'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-yellow-300'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>First star</title>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-yellow-300'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Second star</title>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-yellow-300'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Third star</title>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-yellow-300'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Fourth star</title>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-yellow-300'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Fifth star</title>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
                5.0
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-3xl font-bold text-gray-900 dark:text-white'>
                $599
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsOnSale