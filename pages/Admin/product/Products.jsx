import AdminLayout from '../../../components/layouts/AdminLayout'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { Button, IconButton, Stack } from '@mui/material'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import { BsFillArrowRightCircleFill } from 'react-icons/Bs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { messageSuccess, messageError } from '../../../components/toastify'
import 'react-image-lightbox/style.css'
import Lightbox from 'react-image-lightbox'
import customNoRowsOverlay from '../../../components/noRowInDataGrid'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { AiOutlineEdit } from 'react-icons/ai'

const Products = () => {
  const [selectedRows, setSelectedRows] = useState()
  const router = useRouter()
  const [infShoes, setInfShoes] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [imageSlide, setImageSlide] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const handleClickOpenModal = () => {
    setOpenModal(true)
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      minWidth: 150,
      editable: true,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'images',
      headerName: 'Hình ảnh',
      minWidth: 210,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      sortable: false,
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
      field: 'brand',
      align: 'center',
      headerAlign: 'center',
      headerName: 'Thương hiệu',
      width: 150,
      flex: 1,
      editable: false,
      renderCell: (params) => {
        const brand = params?.row?.brand[0]?.name
        return <p className='font-serif'>{brand}</p>
      }
    },
    {
      field: 'priceInput',
      headerName: 'Giá nhập',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 100,
      editable: true
    },
    {
      field: 'discount',
      headerName: 'Giảm giá',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      width: 100,
      editable: true
    },
    {
      field: 'price',
      headerName: 'Giá bán',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      width: 100,
      editable: true
    },
    {
      field: 'quantity',
      headerName: 'Nhập vào',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      type: 'number',
      width: 100,
      editable: true
    },
    {
      field: 'actions',
      sortable: false,
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      headerName: 'Chỉnh sửa',
      width: 150,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              router.push({
                pathname: '/admin/product/addNewProduct',
                query: { id: params.row._id }
              })
            }}
          >
            <AiOutlineEdit />
          </IconButton>
        )
      }
    }
  ]

  const EditToolbar = () => {
    return (
      <GridToolbarContainer>
        <Stack direction='column' padding={2}>
          <Stack className='w-full'>
            <span className='font-medium text-2xl mb-2'>
              Danh sách sản phẩm
            </span>
            <Stack spacing={1} direction='row' justifyContent='space-between'>
              <Link href='/admin/product/addNewProduct'>
                <Button variant='outlined' startIcon={<FaPlus size={12} />}>
                  Thêm mới
                </Button>
              </Link>
              <Button
                startIcon={<FaTrashAlt size={12} />}
                color='error'
                variant='outlined'
                onClick={handleClickOpenModal}
              >
                Xoá
              </Button>
            </Stack>
            <Stack />
          </Stack>
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
    <div className='p-6 h-screen mt-20 bg-slate-200'>
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          className='flex flex-row justify-between items-center'
          sx={{
            background: '#d24a4a',
            color: 'white'
          }}
          id='alert-dialog-title'
        >
          <span>Xoá sản phẩm</span>
          <FaTrashAlt size={20} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className='text-gray-500 mt-4'
            id='alert-dialog-description'
          >
            {selectedRows
              ? 'Bạn có chắc muốn xoá sản phẩm này'
              : 'Chưa có sản phẩm được chọn'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModal(false)
            }}
          >
            Huỷ
          </Button>
          <Button
            onClick={() => {
              setOpenModal(false)
              if (selectedRows) onHandleDel()
            }}
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <div className='p-2 bg-[#f9f9f9] rounded-xl'>
        <DataGrid
          autoHeight
          sx={{
            width: 'auto',
            border: 'none',
            '& .Mui-table-action': {
              cursor: 'pointer'
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main'
            },
            '& .MuiDataGrid-columnSeparator--sideRight': {
              display: 'none'
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontFamily: 'revert-layer',
              fontSize: 18,
              fontWeight: 500,
              color: 'gray'
            },
            boxShadow: 2
          }}
          rowHeight={100}
          rows={infShoes}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          checkboxSelection
          editMode={false}
          disableSelectionOnClick
          hideFooterSelectedRowCount
          components={{
            Toolbar: EditToolbar,
            NoRowsOverlay: customNoRowsOverlay,
            NoResultsOverlay: customNoRowsOverlay
          }}
          componentsProps={{
            panel: {
              sx: {
                '& .MuiTypography-root': {
                  color: 'blue',
                  fontSize: 20
                },
                '& .MuiDataGrid-filterForm': {
                  bgcolor: 'lightblue'
                }
              }
            }
          }}
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(ids) => {
            setSelectedRows(ids)
          }}
        />
      </div>
    </div>
  )
}

Products.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default Products
