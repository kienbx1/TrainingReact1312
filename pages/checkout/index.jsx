import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormInfoCustomer from '../../components/FormInfoCustomer'
import FormReceivedWeekly from '../../components/FormReceivedWeekly'
import InfoOrder from '../../components/InfoOrder'
import CustomerServicePolicy from '../../components/layouts/body/CustomerServicePolicy'
import UserLayout from '../../components/layouts/UserLayout'

const Checkout = () => {
  const { cartProducts } = useSelector(state => state?.cart)
  const [listProductsInCart, setListProductsInCart] = useState([])

  useEffect(() => {
    setListProductsInCart(cartProducts)
  }, [cartProducts])

  return (
    <>
      <div className='space-two-side'>
        {
          listProductsInCart?.length === 0
            ? (
              <p className='text-3xl font-semibold text-center my-40'>
                Bạn chưa có sản phẩm để thanh toán!
                <Link
                  href={{
                    pathname: '/product-list',
                    query: { name: 'all-items' }
                  }}
                >
                  <span className='underline inline'> Mua sắm thôi</span>
                </Link>
              </p>
              )
            : (
              <div className='flex flex-col md:flex-row px-4 md:px-0 mb-5 md:my-20 gap-5'>
                <FormInfoCustomer />
                <InfoOrder />
              </div>
              )
        }
      </div>
      <FormReceivedWeekly />
      <CustomerServicePolicy />
    </>
  )
}

Checkout.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}

export default Checkout
