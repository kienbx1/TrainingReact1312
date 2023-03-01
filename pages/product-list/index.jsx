import axios from 'axios'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsBasket } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import Error from '../../components/Error'
import CustomerServicePolicy from '../../components/layouts/body/CustomerServicePolicy'
import UserLayout from '../../components/layouts/UserLayout'
import Loading from '../../components/Loading'
import ShowProducts from '../../components/ShowProducts'
import { getProducts, getProductsBrand } from '../../redux/slices/productSlice'

const ProductScreen = () => {
  const dispatch = useDispatch()
  const { products, isLoading, isError } = useSelector(state => state?.product)
  const { query } = useRouter()

  useEffect(() => {
    if (query?.name) {
      if (query?.name === 'all-items') {
        dispatch(getProducts())
      } else {
        dispatch(getProductsBrand(query?.name))
      }
    }
  }, [query?.name])

  if (isEmpty(products) || isLoading) {
    return (
      <Loading />
    )
  }
  if (isError) {
    return (
      <Error />
    )
  }
  return (
    <>
      <div className='bg-orange-primary py-12 relative overflow-hidden'>
        <div className='w-[80%] md:w-[50%] mx-auto relative z-[1]'>
          <img src='/Images/Banner_tag/banner--all.jpg' className='w-full rounded shadow-4xl' />
        </div>
        <img src='/Images/shape-1.png' className='absolute top-[10%] z-0 left-1/2 -translate-x-2/4' />
        <img src='/Images/shape-2.png' className='absolute z-0 right-0 top-[40%]' />
      </div>
      <div className='space-two-side pt-10 pb-7'>
        <div className='px-5'>
          <div className='flex items-center gap-3'>
            <div className='w-6 h-6 flex items-center justify-center rounded-[50%] bg-[#8c71db]'>
              <BsBasket className='text-white text-xs' />
            </div>
            <p className='capitalize text-[#8c71db] text-sm font-semibold'>sản phẩm của chúng tôi</p>
          </div>
          <p className='capitalize font-semibold text-2xl md:text-3xl mt-3'>Khám phá thêm các sản phẩm chúng tôi</p>
        </div>
        <ShowProducts data={products} isLoading={isLoading} isError={isError} />
      </div>
      <CustomerServicePolicy />
    </>
  )
}

ProductScreen.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default ProductScreen
