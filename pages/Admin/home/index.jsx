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
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { FaDollarSign } from 'react-icons/fa'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import CountUp from '../../../components/CountUp'

const rows = [
  {
    id: 1,
    shoe: 'Nikeassahsaijdjdbsad',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 35,
    total: '1.234.456'
  },
  {
    id: 2,
    shoe: 'Nike',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 42,
    total: '1.234.456'
  },
  {
    id: 3,
    shoe: 'Nike',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 45,
    total: '1.234.456'
  },
  {
    id: 4,
    shoe: 'Nike',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 16,
    total: '1.234.456'
  },
  {
    id: 5,
    shoe: 'Nike',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: null,
    total: '1.234.456'
  },
  {
    id: 6,
    shoe: 'Nike',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 150,
    total: '1.234.456'
  },
  {
    id: 7,
    shoe: 'Nike',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 44,
    total: '1.234.456'
  },
  {
    id: 8,
    shoe: 'Nike',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 36,
    total: '1.234.456'
  },
  {
    id: 9,
    shoe: 'Nike',
    branch: 'Nike',
    image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    purchases: 65,
    total: '1.234.456'
  }
]
const overview = [
  {
    text: 'Tổng thu nhập',
    num: '200000',
    percent: '25',
    color: '#0088FE'
  },
  {
    text: 'Tổng chi',
    num: '20000',
    percent: '25',
    color: '#FF8042'
  },
  {
    text: 'Tổng số thành viên',
    num: '2000',
    percent: '25',
    color: '#00C49F'
  },
  {
    text: 'Tỷ suất lợi nhuận',
    num: '20',
    percent: '25',
    color: '#0088FE'
  }
]
const data = [
  { name: 'Jan', Nike: 4100, Adidas: 400, Converse: 2400 },
  { name: 'Feb', Nike: 4100, Adidas: 9400, Converse: 2400 },
  { name: 'Mar', Nike: 3400, Adidas: 2400, Converse: 2400 },
  { name: 'Apr', Nike: 400, Adidas: 2400, Converse: 2400 },
  { name: 'May', Nike: 400, Adidas: 2400, Converse: 2400 },
  { name: 'Jun', Nike: 400, Adidas: 2400, Converse: 2400 },
  { name: 'Jul', Nike: 400, Adidas: 2400, Converse: 2400 },
  { name: 'Aug', Nike: 400, Adidas: 2400, Converse: 2400 },
  { name: 'Sep', Nike: 400, Adidas: 1500, Converse: 2400 },
  { name: 'Oct', Nike: 400, Adidas: 2400, Converse: 2400 },
  { name: 'Nov', Nike: 400, Adidas: 2400, Converse: 2400 },
  { name: 'Dec', Nike: 400, Adidas: 2400, Converse: 2400 }
]
const dataPie = [
  { name: 'Nike', value: 400 },
  { name: 'Adidas', value: 300 },
  { name: 'Converse', value: 300 }
]
const COLORS = ['#0088FE', '#00C49F', '#FF8042']
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const Home = () => {
  const columns = [
    {
      field: 'id',
      renderHeader: () => <p className='font-bold'>ID</p>,
      headerClassName: 'super-app-theme--header',
      width: 50,
      flex: 1
    },
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

  return (
    <div className='bg-white m-4'>
      <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 justify-center'>
        {overview.map((data) => (
          <div
            key={data.text}
            className={`font-bold w-full bg-[${data.color}] sm:w-40 md:w-60 h-44 rounded-md mt-10 p-2 flex flex-col justify-around text-white`}
          >
            <p className='lg:text-2xl sm:text-xl text-2xl'>{data.text}</p>
            <div className='lg:text-3xl flex flex-row sm:text-xl text-3xl'>
              <FaDollarSign />
              <CountUp start={0} end={data.num} />
            </div>
            <div className='text-white flex flex-row text-xl lg:text-xl sm:text-sm'>
              <span>Tăng&nbsp;</span>
              <span>
                <CountUp start={0} end={data.percent} />
              </span>
              <span>%</span>
            </div>
          </div>
        ))}
      </div>
      <div className='sm:flex sm:flex-col lg:flex-row md:justify-evenly'>
        <div className='flex flex-col mt-10 border p-8 bg-slate-100 rounded-lg w-72 md:w-full lg:w-96'>
          <p className='sm:text-xl lg:text-2xl mb-3'>
            Thống kê doanh thu theo tháng
          </p>
          <ResponsiveContainer width='100%' height='100%'>
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
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='mt-10 border-2 p-8 m-2 flex flex-col bg-slate-100 rounded-lg'>
            <div>
              <p className='sm:text-xl lg:text-2xl'>Thu nhập :</p>
            </div>
            <hr />
            <PieChart width={200} height={300}>
              <Pie
                data={dataPie}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div>
              <ul className='flex flex-col md:flex-row justify-between list-disc'>
                <li className='text-[#0088FE]'>Nike</li>
                <li className='text-[#00C49F]'>Adidas</li>
                <li className='text-[#FF8042]'>Converse</li>
              </ul>
            </div>
          </div>
          <div className='mt-10 border-2 p-8 m-2 flex flex-col bg-slate-100 rounded-lg'>
            <div>
              <p className='sm:text-xl lg:text-2xl'>Chi phí :</p>
            </div>
            <hr />
            <PieChart width={200} height={300}>
              <Pie
                data={dataPie}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div>
              <ul className='flex flex-col md:flex-row justify-between list-disc'>
                <li className='text-[#0088FE]'>Nike</li>
                <li className='text-[#00C49F]'>Adidas</li>
                <li className='text-[#FF8042]'>Converse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='p-2 m-4 bg-slate-100 rounded-lg justify-around items-center flex flex-col'>
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
