import Link from 'next/link'
import { useEffect } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BsBasket } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../redux/slices/productSlice'
import ProductItem from '../../ProductItem'

const ExploreProducts = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state?.product)

  useEffect(() => {
    dispatch(getProducts('all-items'))
  }, [])

  return (
    <div className='space-two-side'>
      <div className='mx-5 mt-16 mb-12'>
        <div className='flex gap-2 items-center mb-3'>
          <div className='w-6 h-6 flex items-center justify-center rounded-[50%] bg-[#8c71db]'>
            <BsBasket className='text-white text-base' />
          </div>
          <p className='capitalize text-[#8c71db] text-sm font-semibold'>sản phẩm của chúng tôi</p>
        </div>
        <p className='text-3xl font-semibold'>Khám phá thêm các sản phẩm của chúng tôi</p>
      </div>
      <div className='flex flex-col md:flex-row gap-4 md:gap-8 -mb-10 md:mb-24'>
        <div className='scroll__custom flex flex-col md:flex-row items-center gap-5 md:pb-12 pt-5 overflow-auto'>
          {
          products?.length === 0
            ? (
              <p>Hiện chưa có sản phẩm nào</p>
              )
            : products?.slice(0, 6)?.map(item => {
              return (
                <ProductItem item={item} key={item?._id} />
              )
            })
          }
          <Link
            href={{
              pathname: '/product-list',
              query: { name: 'all-items' }
            }}
          >
            <div className='hidden md:block p-5 bg-[#f6f7fb] mb-32 rounded-md hover:cursor-pointer shadow-3xl hover:shadow-xl hover:scale-110 duration-500'>
              <AiOutlineArrowRight className='font-semibold' />
            </div>
          </Link>
        </div>
        <Link
          href={{
            pathname: '/product-list',
            query: { name: 'all-items' }
          }}
        >
          <div className='block w-32 mx-auto md:hidden p-5 bg-[#f6f7fb] mb-32 rounded-md hover:cursor-pointer shadow-3xl0'>
            <p className='capitalize font-semibold'>xem thêm</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ExploreProducts
