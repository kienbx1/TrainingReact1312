import React from 'react'
import CartSocialFixed from './CartSocialFixed'
import Footer from './Footer'
import Header from './Header'

const UserLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <CartSocialFixed />
      <Footer />
    </div>
  )
}

export default UserLayout
