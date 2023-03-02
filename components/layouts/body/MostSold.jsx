import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import ProductItem from '../../ProductItem'

const MostSold = () => {
  const [newProducts, setNewProducts] = useState([])
  const { products } = useSelector(state => state?.product)

  const random = shuffle(products.slice(0, 20))

  useEffect(() => {
    setNewProducts(random)
  }, [products])

  return (
    <div className='space-two-side'>
      <div className='mx-5 mt-24 mb-12'>
        <div className='flex gap-2 items-center mb-3 justify-center'>
          <div className='w-6 h-6 flex items-center justify-center rounded-[50%] bg-[#8c71db]'>
            <AiFillStar className='text-white text-base' />
          </div>
          <p className='capitalize text-[#8c71db] text-sm font-semibold'>Top sản phẩm</p>
        </div>
        <p className='text-3xl text-center font-semibold'>Sản phẩm bán chạy nhất trên King Shoes</p>
      </div>
      <div className='flex flex-col md:flex-row justify-center mb-16 items-center gap-4 md:gap-8 mb:-mb-10 md:mb-24'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {
          newProducts?.length === 0
            ? (
              <p>Hiện chưa có sản phẩm nào</p>
              )
            : newProducts?.slice(0, 9)?.map(item => {
              return (
                <ProductItem item={item} key={item?._id} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MostSold
