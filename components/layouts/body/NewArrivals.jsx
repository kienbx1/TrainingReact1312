import { useEffect, useState } from 'react'
import { BsBasket } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import ProductItem from '../../ProductItem'

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([])
  const { products } = useSelector(state => state?.product)

  useEffect(() => {
    setNewProducts(products?.filter(item => item.new === true))
  }, [products])

  return (
    <div className='space-two-side'>
      <div className='mx-5 mt-24 mb-12'>
        <div className='flex gap-2 items-center mb-3'>
          <div className='w-6 h-6 flex items-center justify-center rounded-[50%] bg-[#8c71db]'>
            <BsBasket className='text-white text-base' />
          </div>
          <p className='capitalize text-[#8c71db] text-sm font-semibold'>tuần này</p>
        </div>
        <p className='text-3xl font-semibold'>Sản phẩm mới</p>
      </div>
      <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8 -mb-10 md:mb-24'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
          {
          newProducts?.length === 0
            ? (
              <p>Hiện chưa có sản phẩm nào</p>
              )
            : newProducts?.slice(0, 4)?.map(item => {
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

export default NewArrivals
