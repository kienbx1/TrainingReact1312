import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'

const AddNewProduct = () => {
  return <div>AddNewProduct</div>
}
AddNewProduct.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default AddNewProduct
