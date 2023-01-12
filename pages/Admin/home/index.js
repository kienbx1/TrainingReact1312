import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'

const Home = () => {
  return <div>HomePage</div>
}

Home.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Home
