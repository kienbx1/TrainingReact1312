import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { TabContext } from '@mui/lab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { messageSuccess, messageError } from '../../../components/toastify'
import moment from 'moment/moment'
import { Divider, MenuItem, Select } from '@mui/material'
import customNoRowsOverlay from '../../../components/noRowInDataGrid'

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
    { field: '_id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'productName',
      headerName: 'Tên sản phẩm',
      width: 180,
      editable: false,
      renderCell: (params) => {
        const nameOfProduct = params?.row?.products.map((item) => item.name)
        return <p className='font-serif'>{nameOfProduct}</p>
      }
    },
    {
      field: 'userName',
      headerName: 'Tên người mua',
      width: 150,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 150,
      renderCell: (params) => {
        return (
          <Select
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 }
            }}
            disableUnderline
            variant='outlined'
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
      field: 'quantityProduct',
      headerName: 'Số lượng',
      width: 110,
      editable: false
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng tiền',
      type: 'number',
      width: 110,
      editable: false
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      type: 'number',
      width: 350,
      editable: false
    },
    {
      field: 'createdAt',
      headerName: 'Thời gian đặt hàng',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const timeOfOrder = moment(params?.row?.createdAt).format('DD/MM/YYYY')
        return <p className='font-serif'>{timeOfOrder}</p>
      }
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
    <div className='p-6 h-full h-screen mt-20 bg-slate-200'>
      <div className='p-2 bg-[#f9f9f9] rounded-xl'>
        <Box
          component='form'
          mt={2}
          sx={{ width: '100%', height: '100%', typography: 'body1' }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
              <Divider sx={{ mt: 3 }} />
            </Box>
            <TabPanel value='1'>
              <Box sx={{ height: 600, width: '100%' }}>
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
                      fontSize: 18
                    }
                  }}
                  pageSize={10}
                  getRowId={(row) => row._id}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  components={{
                    NoRowsOverlay: customNoRowsOverlay,
                    NoResultsOverlay: customNoRowsOverlay
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              <Box sx={{ height: 600, width: '100%' }}>
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
                      fontSize: 18
                    }
                  }}
                  pageSize={10}
                  getRowId={(row) => row._id}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  components={{
                    NoRowsOverlay: customNoRowsOverlay,
                    NoResultsOverlay: customNoRowsOverlay
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel value='3'>
              <Box sx={{ height: 600, width: '100%' }}>
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
                      fontSize: 18
                    }
                  }}
                  pageSize={10}
                  getRowId={(row) => row._id}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  components={{
                    NoRowsOverlay: customNoRowsOverlay,
                    NoResultsOverlay: customNoRowsOverlay
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
