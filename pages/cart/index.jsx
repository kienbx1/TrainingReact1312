import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Cookies from 'universal-cookie'

import CustomerServicePolicy from '../../components/layouts/body/CustomerServicePolicy'
import UserLayout from '../../components/layouts/UserLayout'
import OrderSummary from '../../components/OrderSummary'
import ProductsListInCart from '../../components/ProductsListInCart'

const Cart = () => {
  const [listProductsInCart, setListProductsInCart] = useState([])
  const [loginMessage, setLoginMessage] = useState(false)
  const [quantityItems, setQuantityItems] = useState(0)

  const { cartProducts, cartTotalQuantity } = useSelector(state => state?.cart)

  const cookies = new Cookies()

  useEffect(() => {
    if (!cookies.get('token')) {
      (setLoginMessage(true))
      return
    }
    setListProductsInCart(cartProducts)
    setQuantityItems(cartTotalQuantity)
  }, [cartTotalQuantity])

  return (
    <>
      <ToastContainer />
      {
      loginMessage
        ? (
          <div className='flex items-center justify-center py-40'>
            <p className='text-lg md:text-3xl text-black capitalize'>bạn cần đăng nhập để xem giỏ hàng</p>
          </div>
          )
        : (
          <div className='space-two-side'>
            <div className='my-10 px-3 md:py-0 md:my-20'>
              <div className='flex items-center md:items-start justify-between mb-5'>
                <p className='text-xl md:text-2xl capitalize'>giỏ hàng của bạn (<span>{`${quantityItems} sản phẩm`})</span></p>
              </div>
              {
            listProductsInCart?.length === 0
              ? (
                <p className='font-semibold text-xl text-center'>Chưa có sản phẩm nào,
                  <Link
                    href={{
                      pathname: '/product-list',
                      query: { name: 'all-items' }
                    }}
                  >
                    <span className='underline inline'>mua sắm thôi</span>
                  </Link>
                </p>
                )
              : (
                <ProductsListInCart />
                )
            }
            </div>
            {
          listProductsInCart?.length !== 0
            ? (
              <OrderSummary />
              )
            : (
              <></>
              )
          }
          </div>
          )
    }
      <CustomerServicePolicy />
    </>
  )
}

Cart.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default Cart
