import React from 'react'
import { Provider } from 'react-redux'
import SideBar from '../SideBar'
import store from '../../store'

const AdminLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <div className='flex flex-row'>
        <SideBar />
        <main className='w-full'>
          <div>{children}</div>
        </main>
      </div>
    </Provider>
  )
}

export default AdminLayout
