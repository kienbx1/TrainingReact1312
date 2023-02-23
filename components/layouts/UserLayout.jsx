import React from 'react'
import CartSocialFixed from './CartSocialFixed'
import Footer from './Footer'
import Header from './Header'
import { Provider } from 'react-redux'
import store from '../../store'

const UserLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <div className='relative'>
        <Header />
        <main>{children}</main>
        <CartSocialFixed />
        <Footer />
      </div>
    </Provider>
  )
}

export default UserLayout
