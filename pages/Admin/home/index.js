import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'

const data = [
  { name: 'Thang 1', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Thang 2', uv: 600 },
  { name: 'Thang 3', uv: 200 },
  { name: 'Thang 4', uv: 260 },
  { name: 'Thang 5', uv: 300 },
  { name: 'Thang 6', uv: 400 },
  { name: 'Thang 7', uv: 100 }
]

const Home = () => {
  return (
    <div>
      <div className='mt-10 border-2 border-black p-8'>
        <p className='font-bold text-xl'>Thống kê doanh thu :</p>
        <LineChart
          width={500}
          height={200}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type='monotone' dataKey='uv' stroke='#8884d8' />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
      <div className='h-[100px] bg-black'>a</div>
    </div>
  )
}

Home.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Home
