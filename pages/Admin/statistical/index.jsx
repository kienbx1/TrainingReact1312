import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { TabContext } from '@mui/lab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { useEffect, useState } from 'react'
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { messageSuccess, messageError } from '../../../components/toastify'
import moment from 'moment/moment'
import {
  Divider,
  InputAdornment,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  TextField
} from '@mui/material'
import customNoRowsOverlay from '../../../components/noRowInDataGrid'
import { AiOutlineSearch } from 'react-icons/ai'

const tabs = [
  { label: 'Đang chờ', value: '1' },
  { label: 'Đã xác nhận', value: '2' },
  { label: 'Đã huỷ', value: '3' }
]
const options = [
  {
    label: 'Xác nhận',
    value: 'Accepted'
  },
  {
    label: 'Huỷ đơn',
    value: 'Denied'
  },
  {
    label: 'Đang chờ',
    value: 'Waiting'
  }
]

const Statistical = () => {
  const [value, setValue] = useState('1')
  const [infOrders, setInfOrders] = useState([])
  const cookies = new Cookies()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const columns = [
    {
      field: 'productName',
      headerName: 'Tên sản phẩm',
      width: 180,
      headerAlign: 'left',
      flex: 1,
      align: 'left',
      editable: false,
      renderCell: (params) => {
        const nameOfProduct = params?.row?.products.map((item) => item.name)
        return <p className='font-serif'>{nameOfProduct}</p>
      }
    },
    {
      field: 'userName',
      headerName: 'Tên người mua',
      flex: 1,
      width: 180,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      width: 150,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <Select
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 }
            }}
            disableUnderline
            variant='standard'
            defaultValue={params?.row?.status}
            className='pr-3 text-black flex flex-row justify-center'
          >
            {options.map((option, index) => (
              <MenuItem
                key={index}
                onClick={async (e) => {
                  handleChangeOption(e, params)
                }}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )
      }
    },
    {
      field: 'createdAt',
      headerName: 'Thời gian đặt hàng',
      width: 200,
      headerAlign: 'left',
      flex: 1,
      align: 'left',
      editable: false,
      renderCell: (params) => {
        const timeOfOrder = moment(params?.row?.createdAt).format('DD/MM/YYYY')
        return <p className='font-serif'>{timeOfOrder}</p>
      }
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng tiền',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <span className='flex flex-row'>{params.row?.totalPrice} VND</span>
        )
      }
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      type: 'number',
      width: 430,
      editable: false
    }
  ]

  const handleChangeOption = async (e, params) => {
    const updateStatus = {}
    updateStatus.orderId = params.row._id
    updateStatus.status = e?.target?.dataset?.value
    axios({
      url: '/api/orders/',
      method: 'PUT',
      data: updateStatus,
      headers: { Authorization: `${cookies.get('token')}` }
    })
      .then((res) => {
        messageSuccess(res)
        if (params.row) {
          const result = infOrders.map((item) => {
            if (item._id === params.row._id) {
              return {
                ...item,
                status: e?.target?.dataset?.value
              }
            }
            return item
          })
          setInfOrders(result)
        }
      })
      .catch((error) => {
        const err = error?.response?.data?.msg || 'Server Error'
        messageError(err)
      })
  }
  function CustomPagination () {
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

  // Get all data
  useEffect(() => {
    axios.get('/api/orders/').then((res) => {
      res?.data?.order?.map((item) => {
        item.address = `${item.address}, ${item.district}, ${item.city}`
        return item.address
      })
      setInfOrders(res?.data?.order)
    })
  }, [])

  return (
    <div className='p-6 h-fit mt-20 bg-slate-200'>
      <div className='p-2 bg-[#f9f9f9] rounded-xl'>
        <Box
          component='form'
          mt={2}
          sx={{ width: '100%', height: '100%', typography: 'body1' }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 0,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <TabList onChange={handleChange}>
                {tabs.map((item, index) => (
                  <Tab
                    sx={{ fontSize: 20 }}
                    label={item.label}
                    value={item.value}
                    key={index}
                  />
                ))}
              </TabList>
              <TextField
                id='search'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AiOutlineSearch />
                    </InputAdornment>
                  )
                }}
                className='w-1/4 mx-3'
              />
            </Box>
            <Divider sx={{ marginTop: 2 }} />
            <TabPanel value='1'>
              <Box sx={{ height: 640, width: '100%' }}>
                <DataGrid
                  rows={infOrders.filter((data) => data.status === 'Waiting')}
                  columns={columns}
                  sx={{
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
                      fontSize: 19,
                      color: 'black'
                    }
                  }}
                  pageSize={10}
                  getRowId={(row) => row._id}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  components={{
                    NoRowsOverlay: customNoRowsOverlay,
                    NoResultsOverlay: customNoRowsOverlay,
                    Pagination: CustomPagination
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              <Box sx={{ height: 640, width: '100%' }}>
                <DataGrid
                  rows={infOrders.filter((data) => data.status === 'Accepted')}
                  columns={columns}
                  sx={{
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
                      fontSize: 19,
                      color: 'black'
                    }
                  }}
                  pageSize={10}
                  getRowId={(row) => row._id}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  components={{
                    NoRowsOverlay: customNoRowsOverlay,
                    NoResultsOverlay: customNoRowsOverlay,
                    Pagination: CustomPagination
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel value='3'>
              <Box sx={{ height: 640, width: '100%' }}>
                <DataGrid
                  rows={infOrders.filter((data) => data.status === 'Denied')}
                  columns={columns}
                  sx={{
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
                      fontSize: 19,
                      color: 'black'
                    }
                  }}
                  pageSize={10}
                  getRowId={(row) => row._id}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  components={{
                    NoRowsOverlay: customNoRowsOverlay,
                    NoResultsOverlay: customNoRowsOverlay,
                    Pagination: CustomPagination
                  }}
                />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  )
}

Statistical.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default Statistical
