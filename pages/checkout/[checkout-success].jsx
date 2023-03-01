import Link from 'next/link'
import { AiOutlineCheck } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import UserLayout from '../../components/layouts/UserLayout'
import { resetCart } from '../../redux/slices/cartSlice'

const CheckoutSuccess = () => {
  const dispatch = useDispatch()
  dispatch(resetCart())

  return (
    <div className='space-two-side'>
      <div className='my-10'>
        <div className='bg-[#e1e1e1] p-10 flex items-center flex-col gap-5'>
          <p className='text-xl font-semibold'>Đặt hàng thành công</p>
          <div className='w-14 md:w-20 h-14 md:h-20 rounded-full bg-green-600 flex items-center justify-center'>
            <AiOutlineCheck className='text-3xl md:text-5xl text-white font-semibold' />
          </div>
          <p className='text-center md:text-start text-lg font-medium'>Cảm ơn bạn đã lựa chọn mua sản phẩm của chúng tôi !</p>
          <p className='text-center md:text-start -mt-2'>Đơn hàng của bạn sẽ được giao đến bạn trong vòng 3 ngày !</p>
          <Link
            href={{
              pathname: '/product-list',
              query: { name: 'all-items' }
            }}
          >
            <div className='bg-[#3577f0] px-6 py-4 rounded-md md:hover:scale-110 duration-300'>
              <p className='uppercase text-white font-medium'>Tiếp tục mua sắm</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

CheckoutSuccess.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}

export default CheckoutSuccess
