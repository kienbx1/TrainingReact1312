import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { useRouter } from 'next/router'
import { MdOutlineCancel } from 'react-icons/Md'
import axios from 'axios'
import LazyLoad from 'react-lazyload'
import { Divider } from '@mui/material'

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
  const [displayImg, setDisplayImg] = useState()

  // Gọi api tìm kiếm theo idproduct,api get all user
  useEffect(() => {
    axios({ url: `/api/products/${productID}`, method: 'GET' }).then((res) => {
      setInfShoe(res?.data?.products)
      setDisplayImg(res?.data?.products?.images[0])
      console.log(res?.data?.products)
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
    <div className='flex flex-col items-start mt-16 p-6 bg-slate-100'>
      <div className='rounded-xl bg-white w-full border-black p-2 flex flex-row justify-between drop-shadow-lg'>
        <div className='flex flex-row w-full'>
          <div className='w-1/2 flex flex-col items-center'>
            <img
              src={displayImg}
              alt='Avatar'
              className='sm:w-16 md:w-20 lg:w-1/2 m-2 drop-shadow-lg rounded-xl'
            />
            <div className='flex flex-row mx-8'>
              <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto gap-3'>
                {infShoe?.images?.map((data, index) => (
                  <img
                    onClick={() => {
                      setDisplayImg(data)
                    }}
                    key={index}
                    src={data}
                    alt='Avatar'
                    className='w-24 rounded-lg m-2 drop-shadow-lg hover:scale-105'
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='w-1/2 p-3 bg-gray-100 rounded-xl shadow-xl relative'>
            <div className='flex flex-row items-center p-2 drop-shadow-lg'>
              <p className='sm:text-xl md:text-2xl lg:text-3xl flex flex-row font-bold'>
                <span>{infShoe?.name}</span>
              </p>
            </div>
            <Divider />
            <div className='flex flex-col ml-6'>
              <p className='m-2 sm:text-base md:text-lg lg:text-xl font-medium'>
                Thương hiệu :
                <span className='text-blue-500 lg:text-2xl md:text-xl sm:text-lg font-semibold'>
                  {infShoe?.brand}
                </span>
              </p>
              <p className='m-2 sm:text-base md:text-medium lg:text-xl font-medium'>
                Sizes :
                <span className='text-gray-500 lg:text-xl md:text-base text-sm font-semibold'>
                  {infShoe?.sizes.map((item, index) => (
                    <span
                      key={index}
                      className='p-2 rounded-full bg-gray-300 mx-1'
                    >
                      {item}
                    </span>
                  ))}
                </span>
              </p>
              <p className='m-2 sm:text-base md:text-lg lg:text-xl text-xl font-medium'>
                Số lượng đặt :
                <span className='text-green-500 mx-2 lg:text-2xl md:text-xl sm:text-lg font-semibold'>
                  {rows?.purchases}
                </span>
              </p>
              <p className='m-2 sm:text-base md:text-lg lg:text-xl text-xl font-medium'>
                Tổng tiền :
                <span className='text-blue-400 mx-2 lg:text-2xl md:text-xl sm:text-lg font-semibold'>
                  {rows?.total} VND
                </span>
              </p>
            </div>
          </div>
          <div className='absolute right-3 top-3'>
            <button className='text-red-400' onClick={() => router.back()}>
              <MdOutlineCancel size={30} />
            </button>
          </div>
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
              <p className='text-xl font-bold m-2'>{data.name}</p>
              <p className='sm:text-base md:text-lg lg:text-xl m-2'>
                Số lượng đã đặt:
                <span className='text-green-700 mx-2'>
                  {data?.quantity || 'Chưa có đơn hàng nào'}
                </span>
              </p>
              <p className='sm:text-base md:text-lg lg:text-xl m-2'>
                Tổng tiền :
                <span className='text-blue-400 mx-2 font-bold'>
                  {data?.purchases || '0'} VND
                </span>
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
              className='bg-blue-400 hover:scale-105 cursor-pointer text-white p-3 rounded-lg ml-1 drop-shadow-lg'
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
