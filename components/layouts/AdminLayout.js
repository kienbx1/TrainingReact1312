import React from 'react'
import SideBar from '../SideBar'

const AdminLayout = ({ children }) => {
  return (
    <div className='flex flex-row'>
      <SideBar />
      <main className='w-full'>
        <div>{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
