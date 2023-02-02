import AdminLayout from '../../../components/layouts/AdminLayout'
import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const columns = [
  { field: 'id', headerName: 'ID', width: 90, editable: false },
  {
    field: 'name',
    headerName: 'Tên sản phẩm',
    width: 250,
    editable: false
  },
  {
    field: 'branch',
    headerName: 'Thương hiệu',
    width: 200,
    editable: false
  },
  {
    field: 'price',
    headerName: 'Giá',
    type: 'number',
    width: 110,
    editable: false
  },
  {
    field: 'quantityLeft',
    headerName: 'Còn lại',
    type: 'number',
    width: 150,
    editable: false
  },
  {
    field: 'quantityInput',
    headerName: 'Nhập vào',
    type: 'number',
    width: 150,
    editable: false
  },
  {
    field: 'quantitySold',
    headerName: 'Đã bán',
    type: 'number',
    width: 150,
    editable: false
  }
]
const data = [
  {
    id: 2,
    name: 'Sows',
    branch: 'Nike',
    price: 31,
    quantityLeft: 1212,
    quantitySold: 1222,
    quantityInput: 12123
  },
  {
    id: 10,
    name: 'Snow',
    branch: 'Nike',
    price: 35,
    quantityInput: 1123,
    quantityLeft: 1232,
    quantitySold: 122
  },
  {
    id: 14,
    name: 'Sáhdk',
    branch: 'Nike',
    price: 37,
    quantityLeft: 128765,
    quantitySold: 12522,
    quantityInput: 1235123
  },
  {
    id: 4,
    name: 'sadaas',
    branch: 'Converse',
    price: 31,
    quantityLeft: 123,
    quantitySold: 1513,
    quantityInput: 1251
  },
  {
    id: 5,
    name: 'hảq',
    branch: 'Converse',
    price: 31,
    quantityLeft: 122312,
    quantitySold: 1222,
    quantityInput: 1235123
  },
  {
    id: 6,
    name: 'ghâva',
    branch: 'Converse',
    price: 31,
    quantityLeft: 122312,
    quantitySold: 1222,
    quantityInput: 1235123
  },
  {
    id: 7,
    name: 'ãvvas',
    branch: 'Adidas',
    price: 31,
    quantityLeft: 122312,
    quantitySold: 1222,
    quantityInput: 1235123
  },
  {
    id: 8,
    name: 'Ságasows',
    branch: 'Adidas',
    price: 31,
    quantityLeft: 122312,
    quantitySold: 1222,
    quantityInput: 1235123
  },
  {
    id: 9,
    name: 'jhfd',
    branch: 'Adidas',
    price: 31,
    quantityLeft: 122312,
    quantitySold: 1222,
    quantityInput: 1235123
  }
]

const Products = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const router = useRouter()

  return (
    <div className='p-6'>
      <p className='uppercase'>Danh sách sản phẩm</p>
      <div>
        <Box sx={{ height: 600, width: '100%' }}>
          <div className='flex flex-row'>
            <div className='p-2'>
              <Link href='/Admin/product/AddNewProduct'>
                <button className='uppercase flex flex-row bg-green-800 p-3 m-3 rounded-lg text-white hover:bg-green-600'>
                  <FaPlus className='mr-1' /> Thêm mới
                </button>
              </Link>
            </div>
            <div className='p-2'>
              <button className='uppercase flex flex-row bg-red-800 p-3 m-3 rounded-lg text-white hover:bg-red-600'>
                <FaTrashAlt className='mr-1' />
                Xoá
              </button>
            </div>
          </div>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            onCellDoubleClick={(ids) => {
              router.push({
                pathname: '/Admin/product/DetailProduct',
                query: { id: ids.id, selectedRows }
              })
            }}
            onSelectionModelChange={(ids) => {
              setSelectedRows(ids)
            }}
          />
        </Box>
      </div>
    </div>
  )
}

Products.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default Products
