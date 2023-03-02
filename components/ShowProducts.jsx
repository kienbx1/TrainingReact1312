import React from 'react'

import 'react-loading-skeleton/dist/skeleton.css'
import ProductList from './ProductList'

const ShowProducts = (props) => {
  return (
    <>
      <ProductList data={props?.data} resetInfoProductAddToCart={props?.resetInfoProductAddToCart} />
    </>
  )
}

export default ShowProducts
