import { BsBasket } from 'react-icons/bs'
import CustomerServicePolicy from '../../components/layouts/body/CustomerServicePolicy'
import UserLayout from '../../components/layouts/UserLayout'
import ListProducts from '../../components/ListProducts'
import data from '../../utils/db'

const adidasProducts = data?.productsList?.filter(item => item?.brand === 'adidas')

const Adidas = () => {
  return (
    <>
      <div className='bg-orange-primary py-12 relative overflow-hidden'>
        <div className='w-[70%] mx-auto relative z-[1]'>
          <img src='/Images/Banner_tag/banner_adidas.jpg' className='w-full rounded shadow-4xl' />
        </div>
        <img src='/Images/shape-1.png' className='absolute top-[10%] z-0 left-1/2 -translate-x-2/4' />
        <img src='/Images/shape-2.png' className='absolute z-0 right-0 top-[40%]' />
      </div>
      <div className='space-two-side py-12'>
        <div className='px-5'>
          <div className='flex items-center gap-3'>
            <div className='w-6 h-6 flex items-center justify-center rounded-[50%] bg-[#8c71db]'>
              <BsBasket className='text-white text-xs' />
            </div>
            <p className='capitalize text-[#8c71db] text-sm font-semibold'>sản phẩm của chúng tôi</p>
          </div>
          <p className='capitalize font-semibold text-3xl mt-3'>Khám phá thêm về Adidas</p>
        </div>
        <ListProducts data={adidasProducts} />
      </div>
      <CustomerServicePolicy />
    </>
  )
}

Adidas.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default Adidas
