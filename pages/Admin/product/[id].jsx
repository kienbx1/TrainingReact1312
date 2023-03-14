import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { useRouter } from 'next/router'
import { MdOutlineCancel } from 'react-icons/Md'
import axios from 'axios'
import LazyLoad from 'react-lazyload'

const rows = {
  id: 1,
  shoe: 'Air Jordan XXXVII SP',
  branch: 'Nike',
  image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
  purchases: 35,
  total: '1.234.456'
}

const DetailProduct = () => {
  const router = useRouter()
  const [infShoe, setInfShoe] = useState()
  const [user, setUser] = useState()
  const productID = router.query.id

  // Gọi api tìm kiếm theo idproduct,api get all user
  useEffect(() => {
    axios({ url: `/api/products/${productID}`, method: 'GET' }).then((res) => {
      setInfShoe(res.data.products)
    })
    axios({ url: '/api/auth/', method: 'GET' }).then((res) => {
      setUser(res.data.user)
    })
  }, [productID])

  const Loading = () => (
    <div className='post loading'>
      <h5>Loading...</h5>
    </div>
  )

  return (
    <div className='flex flex-col items-start mt-10 p-6 bg-slate-100'>
      <div className='rounded-sm bg-white w-full border-black p-2 flex flex-row justify-between drop-shadow-lg'>
        <div>
          <div className='flex flex-row items-center p-2 drop-shadow-lg'>
            <img
              src={infShoe?.images[0]}
              alt='Avatar'
              className='sm:w-16 md:w-20 lg:w-24 rounded-full m-2 drop-shadow-lg hover:scale-105'
            />
            <p className='uppercase sm:text-xl md:text-2xl lg:text-3xl flex flex-row font-bold'>
              <span>{infShoe?.name}</span>
            </p>
          </div>
          <div className='flex flex-col ml-6'>
            <p className='m-2 sm:text-base md:text-lg lg:text-xl font-medium'>
              Thương hiệu :
              <span className='text-blue-500 lg:text-2xl md:text-xl sm:text-lg font-semibold'>
                {infShoe?.brand}
              </span>
            </p>
            <p className='m-2 sm:text-base md:text-lg lg:text-xl text-xl font-medium'>
              Số lượng đặt :
              <span className='text-green-500 lg:text-2xl md:text-xl sm:text-lg font-semibold'>
                {rows?.purchases}
              </span>
            </p>
            <p className='m-2 sm:text-base md:text-lg lg:text-xl text-xl font-medium'>
              Tổng tiền :
              <span className='text-red-500 lg:text-2xl md:text-xl sm:text-lg font-semibold'>
                {rows?.total} VND
              </span>
            </p>
          </div>
          <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto gap-3'>
            {infShoe?.images?.map((data, index) => (
              <img
                key={index}
                src={data}
                alt='Avatar'
                className='w-24 rounded-lg m-2 drop-shadow-lg hover:scale-105'
              />
            ))}
          </div>
        </div>
        <div>
          <button className='text-red-400' onClick={() => router.back()}>
            <MdOutlineCancel size={50} />
          </button>
        </div>
      </div>
      {user?.map((data, index) => (
        <LazyLoad
          key={index}
          offset={[-100, 100]}
          placeholder={<Loading />}
          className='rounded-lg mt-2 hover:scale-[1.01] bg-white w-full border-black p-2 flex flex-row justify-between items-center drop-shadow-lg'
        >
          <div className='flex flex-row items-center p-2 drop-shadow-lg'>
            <img
              className='sm:w-16 md:w-20 lg:w-24 rounded-lg'
              src={data.profilePicUrl}
            />
            <div className='flex flex-col ml-2'>
              <p className='uppercase text-xl font-bold m-2'>{data.name}</p>
              <p className='uppercase sm:text-base md:text-lg lg:text-xl m-2'>
                Số lượng đã đặt:
                <span className='text-green-700'> {data?.purchases || 'Chưa có đơn hàng nào'}</span>
              </p>
              <p className='uppercase sm:text-base md:text-lg lg:text-xl m-2'>
                Tổng tiền :
                <span className='text-red-500 font-bold'>1.200.200 VND</span>
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                router.push({
                  pathname: '/admin/user/[id]',
                  query: { id: data._id }
                })
              }}
              className='bg-blue-400 hover:scale-105 cursor-pointer text-white p-3 rounded-lg ml-1 uppercase drop-shadow-lg'
            >
              Xem chi tiết
            </button>
          </div>
        </LazyLoad>
      ))}
    </div>
  )
}
DetailProduct.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default DetailProduct
