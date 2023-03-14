import React from 'react'
import { Provider } from 'react-redux'
import SideBar from '../SideBar'
import store from '../../store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <div className='flex flex-row'>
        <SideBar />
        <main className='w-full'>
          <div>
            <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
            {children}
          </div>
        </main>
      </div>
    </Provider>
  )
}

export default AdminLayout
