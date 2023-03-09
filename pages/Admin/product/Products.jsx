import AdminLayout from '../../../components/layouts/AdminLayout'
import Box from '@mui/material/Box'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { Button, Stack } from '@mui/material'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import { BsFillArrowRightCircleFill } from 'react-icons/Bs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { messageSuccess, messageError } from '../../../components/toastify'
import 'react-image-lightbox/style.css'
import Lightbox from 'react-image-lightbox'
import moment from 'moment/moment'

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
      minWidth: 210,
      editable: false,
      renderCell: (params) => {
        const num = params?.row?.images?.length - 1
        return (
          <>
            <img className='w-1/2 rounded-lg' src={params?.row?.images[0]} />
            <div
              className='ml-2 flex flex-col cursor-pointer justify-center items-center text-blue-400'
              onClick={() => {
                setIsOpen(true)
                setImageSlide(params?.row?.images)
              }}
            >
              <BsFillArrowRightCircleFill
                className='hover:scale-[105%]'
                size={20}
              />
              <span>Xem thêm {num}</span>
              hình ảnh
            </div>
            {isOpen && (
              <Lightbox
                imageTitle={params.row.name}
                mainSrc={imageSlide[imgIndex]}
                nextSrc={imageSlide[(imgIndex + 1) % imageSlide.length]}
                prevSrc={
                  imageSlide[
                    (imgIndex + imageSlide.length - 1) % imageSlide.length
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
      headerName: 'Thương hiệu',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const brand = params?.row?.brand[0]?.name
        return <p className='font-serif'>{brand}</p>
      }
    },
    {
      field: 'createdAt',
      headerName: 'Ngày nhập',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const timeOfInput = moment(params?.row?.createdAt).format('DD/MM/YYYY')
        return <p className='font-serif'>{timeOfInput}</p>
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
      field: 'price',
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
      field: 'sizes',
      headerName: 'Kích cỡ',
      type: 'number',
      width: 200,
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

  // Get all data products
  useEffect(() => {
    axios({
      url: '/api/products/',
      method: 'GET'
    }).then((res) => {
      setInfShoes(res?.data?.products)
    })
  }, [selectedRows])

  // Update product
  const processRowUpdate = (newRow) => {
    const field = {
      id: newRow._id,
      name: newRow.name,
      createdAt: newRow.createdAt,
      quantity: newRow.quantity,
      priceSell: newRow.priceSell,
      discount: newRow.discount,
      priceInput: newRow.priceInput
    }

    // Gọi api update row
    axios({
      url: `/api/products/${field.id}`,
      method: 'PUT',
      data: field
    })
      .then((res) => {
        messageSuccess(res)
      })
      .catch((error) => {
        const err = error?.response?.data?.msg || 'Server'
        messageError(err)
      })
  }

  // Delete products
  const onHandleDel = () => {
    axios({ url: `/api/products/${selectedRows}`, method: 'DELETE' })
      .then((res) => {
        messageSuccess(res)
        setSelectedRows('')
      })
      .catch((error) => {
        const err = error?.response?.data?.msg || 'Server Error'
        messageError(err)
      })
  }

  return (
    <div className='p-6 mt-10'>
      <p className='text-lg uppercase p-2'>Danh sách sản phẩm</p>
      <div>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rowHeight={100}
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
