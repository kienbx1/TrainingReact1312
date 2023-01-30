import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'

const User = () => {
  return <div>User</div>
}
User.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}

export default User
