import React from 'react'
import { Provider } from 'react-redux'
import store from '../../store'
import CartSocialFixed from './CartSocialFixed'
import Footer from './Footer'
import Header from './Header'

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
