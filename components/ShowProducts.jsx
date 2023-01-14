import React from 'react'

import 'react-loading-skeleton/dist/skeleton.css'
import Error from './Error'
import Loading from './Loading'
import ProductList from './ProductList'

const ShowProducts = (props) => {
  // if (props.isLoading) {
  //   return (
  //     <Loading />
  //   )
  // }
  // if (props.error) {
  //   return (
  //     <Error />
  //   )
  // }
  return (
    <>
      <ProductList data={props?.data} resetInfoProductAddToCart={props?.resetInfoProductAddToCart} />
      <div className='border-b border-slate-200 border-solid pb-12 flex justify-center'>
        <button className='bg-[#f6f7fb] py-4 px-8 rounded-md font-semibold text-[#777777] hover:scale-105 duration-300 hover:shadow-3xl'>Xem thêm</button>
      </div>
    </>
  )
}

export default ShowProducts
