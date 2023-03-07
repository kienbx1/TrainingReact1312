import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box, Divider } from '@mui/material'
import CountUp from '../../../components/CountUp'
import { RiBillLine } from 'react-icons/Ri'
import { AiOutlinePlus } from 'react-icons/Ai'
import { BiUserPlus } from 'react-icons/Bi'
import { TbReportMoney } from 'react-icons/Tb'
import { GoDeviceDesktop } from 'react-icons/Go'
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialPinterest
} from 'react-icons/Ti'

const rows = [
  {
    id: 1,
    shoe: 'Nike Retro',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 315,
    total: '1.234.456'
  },
  {
    id: 2,
    shoe: 'Nike Air',
    branch: 'Nike',
    image: '/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_1.webp',
    purchases: 142,
    total: '1.234.456'
  },
  {
    id: 3,
    shoe: 'Nike Max',
    branch: 'Nike',
    image: '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp',
    purchases: 125,
    total: '1.234.456'
  },
  {
    id: 4,
    shoe: 'Nike Jordan',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 116,
    total: '1.234.456'
  },
  {
    id: 5,
    shoe: 'Nike 90',
    branch: 'Nike',
    image: '/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_1.webp',
    purchases: 111,
    total: '1.234.456'
  },
  {
    id: 6,
    shoe: 'Nike',
    branch: 'Nike',
    image: '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp',
    purchases: 89,
    total: '1.234.456'
  },
  {
    id: 7,
    shoe: 'Nike Air Jordan 1 Mid',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 44,
    total: '1.234.456'
  },
  {
    id: 8,
    shoe: 'Nike Air Max 97',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 36,
    total: '1.234.456'
  },
  {
    id: 9,
    shoe: 'Nike Dunk',
    branch: 'Nike',
    image: '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp',
    purchases: 5,
    total: '1.234.456'
  }
]

const data = [
  { name: 'Jan', Nike: 4100, Adidas: 400, Converse: 2400 },
  { name: 'Feb', Nike: 4100, Adidas: 532, Converse: 2400 },
  { name: 'Mar', Nike: 3400, Adidas: 2400, Converse: 5125 },
  { name: 'Apr', Nike: 415, Adidas: 3400, Converse: 2400 },
  { name: 'May', Nike: 400, Adidas: 540, Converse: 3537 },
  { name: 'Jun', Nike: 3400, Adidas: 1400, Converse: 2400 },
  { name: 'Jul', Nike: 1231, Adidas: 125, Converse: 2400 },
  { name: 'Aug', Nike: 400, Adidas: 2400, Converse: 2400 },
  { name: 'Sep', Nike: 400, Adidas: 1500, Converse: 3400 },
  { name: 'Oct', Nike: 3400, Adidas: 2400, Converse: 2400 },
  { name: 'Nov', Nike: 400, Adidas: 4547, Converse: 2362 },
  { name: 'Dec', Nike: 400, Adidas: 2400, Converse: 2400 }
]

const gender = [
  {
    name: '18-22',
    male: 243,
    female: 53
  },
  {
    name: '22-26',
    male: 526,
    female: 342
  },
  {
    name: '26-30',
    male: 124,
    female: 245
  },
  {
    name: '30-36',
    male: 241,
    female: 141
  },
  {
    name: '36-42',
    male: 41,
    female: 12
  },
  {
    name: '42-48',
    male: 12,
    female: 3
  }
]

const Home = () => {
  const columns = [
    {
      field: 'shoe',
      headerClassName: 'super-app-theme--header',
      width: 200,
      editable: false,
      flex: 1,
      renderHeader: () => <p className='font-bold'>Tên giày</p>
    },
    {
      field: 'branch',
      renderHeader: () => <p className='font-bold'>Thương hiệu</p>,
      headerClassName: 'super-app-theme--header',
      maxWidth: 160,
      editable: false,
      flex: 1
    },
    {
      field: 'image',
      renderHeader: () => <p className='font-bold'>Hình ảnh</p>,
      headerClassName: 'super-app-theme--header',
      maxWidth: 160,
      editable: false,
      renderCell: (params) => {
        return <img src={params.value} />
      }
    },
    {
      field: 'purchases',
      renderHeader: () => <p className='font-bold'>Lượt mua</p>,
      headerClassName: 'super-app-theme--header',
      type: 'number',
      width: 160,
      flex: 1,
      editable: false
    },
    {
      field: 'total',
      renderHeader: () => <p className='font-bold'>Tổng tiền</p>,
      headerClassName: 'super-app-theme--header',
      width: 200,
      flex: 1,
      editable: false,
      renderCell: (params) => {
        return <span>{params.value} VND</span>
      }
    }
  ]

  const overviews = [
    {
      text: 'Đơn hàng mới',
      color: 'black',
      icon: <RiBillLine size={40} />,
      newOrders: 291,
      quantityDifference: 50,
      compareWith: 'So với tuần trước'
    },
    {
      text: 'Khách hàng mới',
      color: 'blue-500',
      icon: <BiUserPlus size={40} />,
      newOrders: 351,
      quantityDifference: 70,
      compareWith: 'So với hôm qua'
    },

    {
      text: 'Lượt truy cập',
      color: 'red-500',
      icon: <GoDeviceDesktop size={40} />,
      newOrders: 2163,
      quantityDifference: 130,
      compareWith: 'So với tháng trước'
    },
    {
      text: 'Doanh thu',
      color: 'blue-500',
      icon: <TbReportMoney size={40} />,
      newOrders: 514000,
      quantityDifference: 30,
      compareWith: '% So với tháng trước'
    }
  ]

  const social = [
    {
      name: 'Facebook',
      follower: 2415,
      feeds: 412,
      color: 'blue-500',
      icon: <TiSocialFacebook size={40} />
    },
    {
      name: 'Youtube',
      follower: 7132,
      feeds: 274,
      color: 'red-500',
      icon: <TiSocialYoutube size={40} />
    },
    {
      name: 'Twitter',
      follower: 5216,
      feeds: 261,
      color: 'blue-500',
      icon: <TiSocialTwitter size={40} />
    },
    {
      name: 'Pinterest',
      follower: 2415,
      feeds: 412,
      color: 'red-500',
      icon: <TiSocialPinterest size={40} />
    }
  ]

  return (
    <div className='bg-slate-300 mt-10'>
      <div className='grid grid-cols-1 gap-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-center mx-2'>
        {overviews.map((overview, index) => (
          <div
            key={index}
            className='mt-14 bg-white sm:w-full md:w-[90%] lg:w-[90%] h-44 rounded-2xl relative drop-shadow-lg'
          >
            <div className='flex flex-row'>
              <div
                className={`bg-${overview?.color} w-16 h-16 ml-4 rounded-lg -mt-3 text-white drop-shadow-lg flex flex-col justify-around items-center`}
              >
                {overview?.icon}
              </div>
              <div className='mt-2 right-6 absolute flex flex-col items-end'>
                <p className='font-thin md:text-lg text-base text-gray-400'>
                  {overview.text}
                </p>
                <p className={`font-bold text-3xl text-${overview.color}`}>
                  <CountUp end={overview?.newOrders} />
                </p>
              </div>
            </div>
            <div>
              <Divider className='text-black mt-7' variant='middle' />
              <div className='flex flex-row font-bold items-center bottom-0 mt-14 ml-3'>
                <AiOutlinePlus className='text-xl text-green-600' size={20} />
                <p className='text-xl text-green-600'>
                  <CountUp end={overview.quantityDifference} />
                </p>
                <p className='text-base font-thin text-gray-400 ml-1'>
                  {overview.compareWith}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='sm:flex sm:flex-col lg:flex-row md:justify-evenly drop-shadow-lg mt-10'>
        <div className='flex flex-col border p-8 bg-white rounded-lg md:w-[100%] lg:w-[50%] lg:m-1 my-1'>
          <ResponsiveContainer width='95%' height={200}>
            <AreaChart
              width='100%'
              height={400}
              data={data}
              margin={{
                top: 10
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Area
                type='monotone'
                dataKey='Nike'
                stackId='1'
                stroke='#8884d8'
                fill='#8884d8'
              />
              <Area
                type='monotone'
                dataKey='Adidas'
                stackId='1'
                stroke='#82ca9d'
                fill='#82ca9d'
              />
              <Area
                type='monotone'
                dataKey='Converse'
                stackId='1'
                stroke='#ffc658'
                fill='#ffc658'
              />
            </AreaChart>
          </ResponsiveContainer>
          <Divider className='text-black mt-7' variant='middle' />
          <p className='lg:text-xl text-base md:text-lg font-bold mt-3'>
            Thống kê doanh thu theo tháng
          </p>
          <p className='lg:text-xl text-base md:text-lg font-thin text-gray-500'>
            <span className='font-bold'>(+15%)</span> Doanh số hôm nay
          </p>
        </div>
        <div className='flex flex-col border p-8 bg-white rounded-lg md:w-[100%] lg:w-[50%] lg:m-1 my-1'>
          <ResponsiveContainer width='95%' height={200}>
            <LineChart
              layout='vertical'
              width={500}
              height={300}
              data={gender}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='number' />
              <YAxis dataKey='name' type='category' />
              <Tooltip />
              <Legend />
              <Line dataKey='male' stroke='#47ff04' />
              <Line dataKey='female' stroke='#ff10f3' />
            </LineChart>
          </ResponsiveContainer>
          <Divider className='text-black mt-7' variant='middle' />
          <p className='lg:text-xl text-base md:text-lg font-bold mt-3'>
            Thống kê số lượt mua theo giới tính
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-center mx-2'>
        {social.map((overview, index) => (
          <div
            key={index}
            className='mt-14 bg-white sm:w-full md:w-[90%] lg:w-[90%] h-44 rounded-2xl flex flex-col justify-around items-center relative drop-shadow-lg'
          >
            <div
              className={`bg-${overview?.color} w-[90%] flex flex-col justify-around items-center drop-shadow-xl h-16 rounded-xl -mt-10 text-white`}
            >
              {overview?.icon}
            </div>
            <div>
              <Divider className='text-black' variant='middle' />
              <div className='flex flex-row font-bold bottom-0 mt-5 ml-3'>
                <div className='flex flex-col m-3 lg:text-2xl md:text-xl sm:text-lg text-base'>
                  <CountUp end={overview.follower} />
                  <p className='font-thin text-slate-500'>Follower</p>
                </div>
                <div className='flex flex-col m-3 lg:text-2xl md:text-xl sm:text-lg text-base'>
                  <p>
                    {' '}
                    <CountUp end={overview.feeds} />
                  </p>
                  <p className='font-thin text-slate-500'>Posts</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='p-2 m-4 bg-slate-50 rounded-lg justify-around items-center flex flex-col drop-shadow-lg'>
        <Box
          sx={{
            height: 700,
            width: '100%',
            '& .super-app-theme--header': {
              backgroundColor: 'rgb(135,206,250)'
            }
          }}
        >
          <DataGrid
            getRowHeight={() => 'auto'}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default Home
