import React, { useState } from 'react'
import { FaHome, FaUser, FaHandHoldingUsd } from 'react-icons/fa'
import { GiConverseShoe } from 'react-icons/gi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Link from 'next/link'

const menu = [
  {
    path: '/Admin/home',
    des: 'Trang chủ',
    icon: <FaHome className='mr-2 text-red-500' />,
    color: 'gray-400',
    txtColor: 'text-red-500'
  },
  {
    path: '/Admin/user/users',
    des: 'Người dùng',
    icon: <FaUser className='mr-2 text-yellow-500' />,
    txtColor: 'text-yellow-500',
    expand: ['Admin', 'User']
  },
  {
    path: '/Admin/statistical',
    des: 'Thống kê',
    icon: <FaHandHoldingUsd className='mr-2 text-green-500' />,
    txtColor: 'text-green-500'
  },
  {
    path: '/Admin/product/Products',
    des: 'Sản phẩm',
    icon: <GiConverseShoe className='mr-2 text-blue-500' />,
    txtColor: 'text-blue-900'
  }
]

const SideBar = () => {
  const [collapse, setCollapse] = useState(false)
  const handleCollapse = () => {
    setCollapse((collapse) => !collapse)
  }

  return (
    <div className='sticky top-0 flex flex-col justify-between w-52 h-screen bg-white shadow-2xl mr-2'>
      <div className='flex flex-col p-3'>
        <div className='h-16 w-full flex flex-row items-center bg-blue-200 mb-4'>
          <p className='text-sm font-medium text-black'>Do Van Tuan</p>
        </div>
        {menu.map((data) => (
          <Link key={data?.path} href={data.path}>
            <button
              className={`flex flex-row ${data?.txtColor}
         hover:bg-red-100 rounded-lg w-full h-10
          cursor-pointer items-center p-2 active:bg-red-100`}
            >
              {data?.icon}
              {data?.des}
            </button>
          </Link>
        ))}
      </div>
      <button
        onClick={handleCollapse}
        className={`hover:bg-blue-400 w-full h-16  flex flex-col justify-around items-center ${
          collapse ? 'bg-blue-300' : 'bg-blue-500'
        }`}
      >
        <MdKeyboardArrowRight
          className={`${
            collapse
              ? 'rotate-180 ease-in-out duration-300'
              : 'rotate-360 ease-in-out duration-300'
          } `}
        />
      </button>
    </div>
  )
}

export default SideBar
