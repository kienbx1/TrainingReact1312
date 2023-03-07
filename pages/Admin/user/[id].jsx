import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { useRouter } from 'next/router'
import { MdOutlineCancel } from 'react-icons/Md'
const datas = {
  id: 1,
  account: 'aa@gmail.com',
  pass: '1234',
  userName: 'Sows',
  address: 'Đà Nẵng,Việt Nam',
  phoneNumber: '123567890',
  purchase: 5,
  total: '9,000,000',
  joinDate: '20-2-2023'
}
const detailOrder = [
  {
    id: '1',
    image: '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp',
    name: 'Air Jordan7 RetroSe 1',
    purchase: 2,
    total: '2,000,000',
    status: 'Đã giao',
    date: '20-02-2022'
  },
  {
    id: '2',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    name: 'Air Jordan XXXVIISP 1',
    purchase: 2,
    total: '2,000,000',
    status: 'Đã huỷ',
    date: '28-02-2022'
  },
  {
    id: '3',
    image:
      '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/White/display.jpg',
    name: 'Chuck Taylor All Star Lugged 2.0',
    purchase: 1,
    total: '2,000,000',
    status: 'Đã giao',
    date: '12-04-2022'
  },
  {
    id: '3',
    image: '/Images/Converse/Converse x DRKSHDW TURBOWPN High Top/display.jpg',
    name: 'Converse x DRKSHDW TURBOWPN',
    purchase: 1,
    total: '1,000,000',
    status: 'Đã giao',
    date: '24-05-2022'
  }
]
const detailUser = () => {
  const router = useRouter()
  return (
    <div className='flex flex-col items-start p-6 bg-slate-100 mt-10'>
      <div className='rounded-sm bg-white w-full border-black p-2 flex flex-row justify-between'>
        <div>
          <div className='flex flex-row items-center p-2'>
            <img
              src='/Images/banner_forget.webp'
              alt='Avatar'
              className='w-24 rounded-full m-2'
            />
            <p className='uppercase flex flex-row font-bold text-3xl'>
              <span>{datas.userName}</span>
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='m-2 text-xl font-medium'>
              Số giày đã mua : <span>{datas.purchase}</span>
            </p>
            <p className='m-2 text-xl font-medium'>
              Tổng tiền : <span>{datas.total}</span>
            </p>
            <p className='m-2 text-xl font-medium'>
              Địa chỉ : <span>{datas.address}</span>
            </p>
            <p className='m-2 text-xl font-medium'>
              Số điện thoại : <span>{datas.phoneNumber}</span>
            </p>
            <p className='m-2 text-xl font-medium'>
              Ngày tạo tài khoản : <span>{datas.joinDate}</span>
            </p>
          </div>
        </div>
        <div>
          <button className='text-red-400' onClick={() => router.back()}>
            <MdOutlineCancel size={50} />
          </button>
        </div>
      </div>
      {detailOrder.map((detail) => (
        <div key={detail.id} className='rounded-sm mt-2 bg-white w-full border-black p-2 flex flex-row justify-between items-center'>
          <div className='flex flex-row items-center p-2'>
            <img className='w-28 rounded-sm' src={detail.image} />
            <div className='flex flex-col ml-2'>
              <p className='uppercase text-xl m-2 font-bold'>{detail.name}</p>
              <p className='uppercase text-lg m-1'>
                Số lượng : <span>{detail.purchase}</span>
              </p>
              <p className='uppercase text-lg m-1'>
                Thành tiền : <span>{detail.total} VND</span>
              </p>
              <p className='uppercase text-lg m-1'>
                Ngày tạo đơn : <span>{detail.date}</span>
              </p>
              <p className='uppercase text-lg m-1'>
                Trạng thái :
                {detail.status === 'Đã giao'
                  ? (
                    <span className='bg-green-400 text-white p-2 rounded-lg ml-1 uppercase'>
                      Đã giao
                    </span>
                    )
                  : (
                    <span className='bg-red-400 text-white p-2 rounded-lg ml-1 uppercase'>
                      Đã huỷ
                    </span>
                    )}
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                router.push({
                  pathname: '/Admin/product/[id]',
                  query: { id: detail.id }
                })
              }}
              className='bg-blue-400 cursor-pointer text-white p-3 rounded-lg ml-1 uppercase'
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
detailUser.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default detailUser
