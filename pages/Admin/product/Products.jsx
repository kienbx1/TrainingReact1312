import AdminLayout from '../../../components/layouts/AdminLayout'
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarContainer,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'
import {
  Button,
  InputAdornment,
  Pagination,
  PaginationItem,
  Stack,
  TextField
} from '@mui/material'
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
import { AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai'

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
            <img className='w-1/3 rounded-lg' src={params?.row?.images[0]} />
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
      field: 'name',
      headerName: 'Tên sản phẩm',
      minWidth: 150,
      editable: true,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
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
      headerName: 'Số lượng nhập vào',
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
          <div>
            <div className='flex flex-row'>
              <Button
                onClick={() => {
                  router.push({
                    pathname: '/admin/product/addNewProduct',
                    query: { id: params.row._id }
                  })
                }}
              >
                <AiOutlineEdit size={20} />
              </Button>
              <Button
                onClick={() => {
                  handleClickOpenModal()
                  setSelectedRows(params.row._id)
                }}
                className='flex flex-row justify-start'
              >
                <FaTrashAlt size={20} />
              </Button>
            </div>
          </div>
        )
      }
    }
  ]

  const EditToolbar = () => {
    return (
      <GridToolbarContainer>
        <div className='w-full p-4'>
          <div className='w-full flex flex-row justify-between items-center'>
            <span className='font-medium text-2xl mb-2'>
              Danh sách sản phẩm
            </span>
            <div className='flex flex-row'>
              <TextField
                size='small'
                id='search'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AiOutlineSearch />
                    </InputAdornment>
                  )
                }}
                className='w-1/2 mr-3'
              />
              <Link href='/admin/product/addNewProduct'>
                <Button sx={{ marginLeft: 2 }} variant='outlined' startIcon={<FaPlus size={12} />}>
                  Thêm mới
                </Button>
              </Link>
            </div>
          </div>
          <Stack
            spacing={1}
            direction='row'
            justifyContent='space-between'
          />
          <Stack />
        </div>
      </GridToolbarContainer>
    )
  }

  const CustomPagination = () => {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)

    return (
      <Pagination
        color='primary'
        variant='outlined'
        shape='rounded'
        page={page + 1}
        count={pageCount}
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
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
            className='text-gray-500 mt-10'
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
              color: 'black'
            }
          }}
          rowHeight={100}
          rows={infShoes}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          editMode={false}
          disableSelectionOnClick
          hideFooterSelectedRowCount
          components={{
            Toolbar: EditToolbar,
            NoRowsOverlay: customNoRowsOverlay,
            NoResultsOverlay: customNoRowsOverlay,
            Pagination: CustomPagination
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
        />
      </div>
    </div>
  )
}

Products.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default Products
