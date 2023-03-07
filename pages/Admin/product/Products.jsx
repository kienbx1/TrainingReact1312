import AdminLayout from '../../../components/layouts/AdminLayout'
import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { Button, Stack } from '@mui/material'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { messageSuccess, messageError } from '../../../components/toastify'
import 'react-image-lightbox/style.css'
import Lightbox from 'react-image-lightbox'

const Products = () => {
  const [selectedRows, setSelectedRows] = useState()
  const router = useRouter()
  const [infShoes, setInfShoes] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [imageSlide, setImageSlide] = useState([])
  const columns = [
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      minWidth: 200,
      flex: 1,
      editable: true
    },
    {
      field: 'images',
      renderHeader: () => <p>Hình ảnh</p>,
      minWidth: 110,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <img
              onClick={() => {
                setIsOpen(true)
                setImageSlide(params.row.images)
              }}
              className='max-w-full cursor-pointer'
              src={params.row.images[0]}
            />
            {isOpen && (
              <Lightbox
                imageTitle={params.row.name}
                mainSrc={imageSlide[imgIndex]}
                nextSrc={
                  imageSlide[(imgIndex + 1) % imageSlide.length]
                }
                prevSrc={
                  imageSlide[
                    (imgIndex + imageSlide.length - 1) %
                      imageSlide.length
                  ]
                }
                onCloseRequest={() => {
                  setIsOpen(false)
                  setImgIndex(0)
                }}
                onMoveNextRequest={() =>
                  setImgIndex((imgIndex + 1) % imageSlide.length)}
              />
            )}
          </>
        )
      }
    },
    {
      field: 'brand',
      headerName: 'Thương hiệu',
      width: 150,
      editable: false
    },
    {
      field: 'createdAt',
      headerName: 'Ngày nhập',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const date = params.row.createdAt.slice(0, 10)
        return <p className='font-serif'>{date}</p>
      }
    },
    {
      field: 'priceInput',
      headerName: 'Giá nhập',
      type: 'number',
      width: 110,
      editable: true
    },
    {
      field: 'discount',
      headerName: 'Giảm giá',
      type: 'number',
      width: 110,
      editable: true
    },
    {
      field: 'priceSell',
      headerName: 'Giá bán',
      type: 'number',
      width: 110,
      editable: true
    },
    {
      field: 'quantity',
      headerName: 'Nhập vào',
      type: 'number',
      width: 150,
      editable: true
    },
    {
      field: 'quantitySold',
      headerName: 'Đã bán',
      type: 'number',
      width: 100,
      editable: false
    },
    {
      field: 'quantityLeft',
      headerName: 'Còn lại',
      type: 'number',
      width: 100,
      editable: false
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              router.push({
                pathname: '/admin/product/[id]',
                query: { id: params.rowNode.id }
              })
            }}
          >
            Xem chi tiết
          </Button>
        )
      }
    }
  ]

  const EditToolbar = () => {
    return (
      <GridToolbarContainer>
        <Stack spacing={2} direction='row'>
          <Link href='/admin/product/addNewProduct'>
            <Button variant='outlined' startIcon={<FaPlus />}>
              Thêm mới
            </Button>
          </Link>
          <Button
            startIcon={<FaTrashAlt />}
            color='error'
            variant='outlined'
            onClick={onHandleDel}
          >
            Xoá
          </Button>
        </Stack>
      </GridToolbarContainer>
    )
  }

  // Get all data
  useEffect(() => {
    axios({
      url: '/api/products/',
      method: 'GET'
    }).then((res) => {
      setInfShoes(res?.data?.products)
    })
  }, [])

  // Update product
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow }
    const field = {
      name: newRow.name,
      createdAt: newRow.createdAt,
      quantity: newRow.quantity,
      priceSell: newRow.priceSell,
      discount: newRow.discount,
      priceInput: newRow.priceInput
    }
    setSelectedRows(newRow._id)
    // Gọi api update row
    axios({
      url: `/api/products/${selectedRows}`,
      method: 'PUT',
      data: field
    })
      .then((res) => {
        if (res) messageSuccess(res)
      })
      .catch((error) => {
        const err = error?.response?.data?.msg
        if (error) {
          messageError(err)
        }
      })
    return updatedRow
  }
  // Delete products
  const onHandleDel = () => {
    axios({ url: `/api/products/${selectedRows}`, method: 'DELETE' })
      .then((res) => {
        if (res) messageSuccess(res)
      })
      .catch((error) => {
        const err = error?.response?.data?.msg
        if (error) {
          messageError(err)
        }
      })
  }

  return (
    <div className='p-6 mt-10'>
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
      <p className='text-lg uppercase p-2'>Danh sách sản phẩm</p>
      <div>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={infShoes}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            editMode='row'
            processRowUpdate={processRowUpdate}
            disableSelectionOnClick
            components={{ Toolbar: EditToolbar }}
            experimentalFeatures={{ newEditingApi: true }}
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
