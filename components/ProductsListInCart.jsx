import Link from 'next/link'
import { useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { DEFAULT_IMAGE } from '../constant/config'
import { removeFromCart, updateCart } from '../redux/slices/cartSlice'

const ProductsListInCart = () => {
  const { cartProducts } = useSelector(state => state?.cart)
  const dispatch = useDispatch()

  const deleteProductHandel = (id) => {
    dispatch(removeFromCart(id))
  }

  const decreaseProductHandle = (id) => {
    const result = cartProducts.map(item => ({
      ...item,
      quantity: item.id === id && item.quantity > 1 ? item.quantity - 1 : item.quantity
    }))
    dispatch(updateCart(result))
  }

  const increaseProductHandle = (id, quantity) => {
    const result = cartProducts.map(item => ({
      ...item,
      quantity: item.id === id && item.quantity < quantity ? item.quantity + 1 : item.quantity
    }))
    dispatch(updateCart(result))
  }

  useEffect(() => {
    if (cartProducts.length !== 0) {
      window.localStorage.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts])

  return (
    <>
      <ToastContainer />
      <table className='min-w-full'>
        <thead className='hidden md:table-header-group bg-[#F6F7FB]'>
          <tr>
            <th className='p-4 text-lg font-semibold text-left'>Xóa</th>
            <th className='p-4 text-lg font-semibold text-left'>Sản phẩm</th>
            <th className='p-4 text-lg font-semibold text-left'>Size</th>
            <th className='p-4 text-lg font-semibold text-left'>Giá</th>
            <th className='p-4 text-lg font-semibold text-left'>Số lượng</th>
            <th className='p-4 text-lg font-semibold text-left'>Tổng tiền</th>
          </tr>
        </thead>
        <tbody className='hidden md:table-row-group'>
          {
            cartProducts?.map((item) => {
              return (
                <tr className='border-solid border-b-2 border-[#F6F7FB]' key={item?.id}>
                  <td className='align-middle p-4'>
                    <div className='w-7 h-7 bg-[#F6F7FB] flex items-center justify-center rounded-[50%] cursor-pointer hover:border border-solid border-[#3577f0]'>
                      <FaTimes onClick={() => deleteProductHandel(item?.id)} />
                    </div>
                  </td>
                  <td className='p-4 flex items-center'>
                    <div className='flex-1'>
                      <img src={item?.images} alt={`ảnh giày ${item?.brand}`} className='w-20 h-20 rounded-md object-cover' />
                    </div>
                    <Link href={`/details-product/${item?.id}`} className='flex-[3]'>
                      <p className='capitalize p-4 font-semibold flex justify-start'>{item?.name || ''}</p>
                    </Link>
                  </td>
                  <td className='p-4 align-middle items-center'>
                    <p className='capitalize p-4 font-semibold flex-[3]'>{item?.size || ''}</p>
                  </td>
                  <td className='align-middle p-4'>
                    {
                      item?.discount
                        ? (
                          <div>
                            <p className='font-semibold mb-2'>{`${(item?.price - item?.price * item?.discount * 0.01)?.toLocaleString() || ''} VND`}</p>
                            <p className='font-semibold line-through -mb-6 text-gray-500 text-sm'>{`${(item?.price)?.toLocaleString() || ''} VND`}</p>
                          </div>
                          )
                        : (
                          <p className='font-semibold'>{`${(item?.price).toLocaleString() || ''} VND`}</p>
                          )
                    }
                  </td>
                  <td className='align-middle p-4'>
                    <div className='flex gap-3 items-center'>
                      <div
                        className='w-7 h-7 bg-[#F6F7FB] flex justify-center items-center rounded-[50%] cursor-pointer hover:border border-solid border-[#3577f0]'
                        onClick={() => decreaseProductHandle(item?.id)}
                      >
                        <AiOutlineMinus />
                      </div>
                      <p className='font-semibold'>{item?.quantity}</p>
                      <div
                        className='w-7 h-7 bg-[#F6F7FB] flex justify-center items-center rounded-[50%] cursor-pointer hover:border border-solid border-[#3577f0]'
                        onClick={() => increaseProductHandle(item?.id, item?.quantity)}
                      >
                        <AiOutlinePlus />
                      </div>
                    </div>
                  </td>
                  <td className='align-middle p-4 pr-0'>
                    {
                      item?.discount !== 0
                        ? (
                          <p className='font-semibold'>{`${((item?.price - item?.price * item?.discount * 0.01) * item?.quantity)?.toLocaleString() || ''} VND`}</p>
                          )
                        : (
                          <p className='font-semibold'>{`${(item?.quantity * item?.price)?.toLocaleString() || ''} VND`}</p>
                          )
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
        <tbody className='md:hidden'>
          {
            cartProducts?.map((item, index) => {
              return (
                <tr className='flex gap-8 mt-3 md:mt-0 py-2 items-center border-b-[2px] border-solid border-b-[#F6F7FB]' key={item._id}>
                  <td className='flex-1'>
                    <img src={item?.images || DEFAULT_IMAGE} alt={`ảnh giày ${item?.brand}`} className='w-20 h-20 rounded-md object-cover' />
                  </td>
                  <td className='flex-[3]'>
                    <div className='flex items-center justify-between pb-3 border-b-[2px] border-solid border-b-[#F6F7FB]'>
                      <p className='capitalize font-semibold max-w-[200px]'>
                        {item?.name || ''}
                      </p>
                      <div className='w-6 h-6 bg-[#F6F7FB] rounded-[50%] flex items-center justify-center'>
                        <FaTimes className='text-sm' onClick={() => deleteProductHandel(item?.id)} />
                      </div>
                    </div>
                    <div className='flex items-center justify-between py-3 border-b-[2px] border-solid border-b-[#F6F7FB]'>
                      <p>Giá:</p>
                      {
                        item?.discount !== 0
                          ? (
                            <div className='text-sm'>
                              <p>{`${(item?.price - item?.price * item?.discount * 0.01)?.toLocaleString() || ''} VND`}</p>
                              <p className='line-through text-gray-500'>{`${(item?.price)?.toLocaleString() || ''} VND`}</p>
                            </div>
                            )
                          : (
                            <div>
                              <p className='text-sm'>{`${(item?.price)?.toLocaleString() || ''} VND`}</p>
                            </div>
                            )
                      }
                    </div>
                    <div className='flex items-center justify-between py-3 border-b-[2px] border-solid border-b-[#F6F7FB]'>
                      <p>Số lượng:</p>
                      <div>
                        <div className='flex gap-3 items-center'>
                          <div
                            className='w-6 h-6 bg-[#F6F7FB] flex justify-center items-center rounded-[50%] cursor-pointer hover:opacity-80'
                            onClick={() => decreaseProductHandle(item?.id)}
                          >
                            <AiOutlineMinus className='text-sm' />
                          </div>
                          <p className='font-semibold text-sm'>{item?.quantity}</p>
                          <div
                            className='w-6 h-6 bg-[#F6F7FB] flex justify-center items-center rounded-[50%] cursor-pointer hover:opacity-80' onClick={() => increaseProductHandle(item?.id, item?.quantity)}
                          >
                            <AiOutlinePlus className='text-sm' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-between py-3'>
                      <p>Tổng tiền:</p>
                      {
                      item?.discount !== 0
                        ? (
                          <p className='font-semibold'>{`${((item?.price - item?.price * item?.discount * 0.01) * item?.quantity)?.toLocaleString() || ''} VND`}</p>
                          )
                        : (
                          <p className='font-semibold'>{`${(item?.quantity * item?.price)?.toLocaleString() || ''} VND`}</p>
                          )
                      }
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default ProductsListInCart
