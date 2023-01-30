import { useState } from 'react'
import UserLayout from '../../components/layouts/UserLayout'
import OrderSummary from '../../components/OrderSummary'
import ProductsListInCart from '../../components/ProductsListInCart'
import SubCustomerServicePolicy from '../../components/layouts/body/SubCustomerServicePolicy'
import data from '../../utils/db'

const Cart = () => {
  const [listProductsInCart, setListProductsInCart] = useState(data.productsInCart)

  const clearAllProducts = () => {
    setListProductsInCart([])
  }

  return (
    <>
      <div className='xl:px-28 lg:px-24 md:px-16 sm:px-0'>
        <div className='my-10 px-3 md:py-0 md:my-20'>
          <div className='flex items-center md:items-start justify-between mb-5'>
            <p className='text-xl md:text-2xl capitalize'>giỏ hàng của bạn</p>
            <p className='text-sm capitalize text-[#3577f0] hover:text-black cursor-pointer duration-300' onClick={clearAllProducts}>xóa tất cả</p>
          </div>
          {
          listProductsInCart.length === 0
            ? (
              <p className='font-semibold text-xl text-center'>Chưa có sản phẩm nào</p>
              )
            : (
              <ProductsListInCart listProductsInCart={listProductsInCart} setListProductsInCart={setListProductsInCart} />
              )
          }
        </div>
        {
        listProductsInCart.length !== 0
          ? (
            <OrderSummary />
            )
          : (
            <></>
            )
        }
      </div>
      <SubCustomerServicePolicy />
    </>
  )
}

Cart.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default Cart
