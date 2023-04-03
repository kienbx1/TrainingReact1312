import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { TabContext } from '@mui/lab'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai'
import { DataGrid } from '@mui/x-data-grid'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Avatar,
  DialogContentText,
  Divider,
  Pagination,
  TextField,
  InputAdornment
} from '@mui/material'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import customNoRowsOverlay from '../../../components/noRowInDataGrid'

const tabs = [
  { label: 'Người dùng', value: '1' },
  { label: 'Người quản trị', value: '2' }
]

const User = () => {
  const columns = [
    {
      field: 'profilePicUrl',
      headerName: 'Avatar',
      width: 100,
      editable: true,
      renderCell: (params) => {
        return <Avatar src={params.row.profilePicUrl} />
      }
    },
    {
      field: 'email',
      headerName: 'Tài khoản',
      width: 200,
      flex: 1,
      editable: true
    },
    {
      field: 'name',
      headerName: 'Tên người dùng',
      width: 150,
      flex: 1,
      editable: true
    },
    {
      field: 'pass',
      headerName: 'Mật khẩu',
      width: 100,
      flex: 1,
      renderCell: (params) => {
        return <Button>Reset</Button>
      }
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Button
              onClick={() => {
                router.push({
                  pathname: '/admin/addnewuser',
                  query: { id: params.id }
                })
              }}
            >
              <AiOutlineEdit size={20} className='cursor-pointer' />
            </Button>
            <Button
              className='cursor-pointer'
              onClick={() => {
                setDelId(params.id)
                setOpenAlertDelRow(true)
              }}
            >
              <FaTrashAlt size={20} />
            </Button>

          </div>
        )
      }
    }
  ]

  const [value, setValue] = useState('1')
  const [openAlertDelRow, setOpenAlertDelRow] = useState(false)
  const [infUser, setInfUser] = useState([])
  const [delId, setDelId] = useState()
  const router = useRouter()

  const PAGE_SIZE = 5
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0
  })
  const [skip, setSkip] = useState(0)

  function RoundedPagination () {
    return (
      <Pagination
        color='primary'
        variant='outlined'
        shape='rounded'
        page={skip + 1}
        count={skip + 2}
        onChange={(event, value) => {
          setSkip(value - 1)
        }}
      />
    )
  }

  // Toast
  const messageSuccess = (res) => {
    toast.success(res?.data?.msg)
  }
  const messageError = (value) => {
    toast.error(value)
  }
  // Get all data
  useEffect(() => {
    axios({
      url: '/api/auth/',
      method: 'GET',
      params: { skip: skip }
    }).then((res) => {
      setInfUser(res?.data?.user)
    })
  }, [skip])
  // Switch tabs
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // Delete user
  const onHandleDel = () => {
    axios({ url: `/api/auth/${delId}`, method: 'DELETE' })
      .then((res) => {
        if (res) {
          messageSuccess(res)
          setInfUser(infUser.filter((data) => data._id !== delId))
          setDelId('')
        }
      })
      .catch((error) => {
        const err = error?.response?.data?.msg
        if (error) {
          messageError(err)
        }
      })
  }

  return (
    <div className='mt-20 p-6 bg-slate-200 h-fit'>

      <div className='p-2 bg-[#f9f9f9] rounded-xl'>
        <Box
          component='form'
          sx={{
            p: 3,
            height: '100%',
            width: '100%',
            '& .actions': {
              color: 'text.secondary'
            },
            '& .textPrimary': {
              color: 'text.primary'
            }
          }}
        >
          <Dialog
            open={openAlertDelRow}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle
              sx={{
                background: '#ff0000a0',
                color: 'white'
              }}
              id='alert-dialog-title'
              className='flex flex-row items-center justify-between'
            >
              <span>Xoá User</span>
              <FaTrashAlt size={20} />
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                className='text-gray-500 mt-4'
                id='alert-dialog-description'
              >
                Bạn có chắc muốn xoá người dùng này
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAlertDelRow(false)}>Huỷ</Button>
              <Button
                onClick={() => {
                  setOpenAlertDelRow(false)
                  if (delId) onHandleDel()
                }}
                autoFocus
              >
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
          <TabContext value={value}>
            <Box className='flex flex-row justify-between'>
              <TabList onChange={handleChange}>
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    sx={{ fontSize: 20 }}
                  />
                ))}
              </TabList>
              <Stack spacing={2} direction='row'>
                <TextField
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
                <Button
                  startIcon={<FaPlus size={15} />}
                  color='primary'
                  variant='outlined'
                  onClick={() => {
                    router.push('/admin/addnewuser')
                  }}
                >
                  Thêm mới
                </Button>
                <Divider sx={{ mt: 3 }} />
              </Stack>
            </Box>
            <TabPanel value='1'>
              <Box>
                <DataGrid
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
                      fontWeight: 500,
                      color: 'black'
                    },
                    height: 700,
                    width: '100%'
                  }}
                  rows={infUser?.filter((data) => data.role === 'user')}
                  getRowId={(row) => row._id}
                  columns={columns}
                  rowHeight={60}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[PAGE_SIZE]}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{
                    NoRowsOverlay: customNoRowsOverlay,
                    NoResultsOverlay: customNoRowsOverlay,
                    Pagination: RoundedPagination
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel
              value='2'
              sx={{
                height: '100%'
              }}
            >
              <Box>
                <DataGrid
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
                      fontWeight: 500,
                      color: 'black'
                    },
                    height: 550,
                    width: '100%'
                  }}
                  rows={infUser?.filter((data) => data.role === 'admin')}
                  getRowId={(row) => row._id}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{
                    NoRowsOverlay: customNoRowsOverlay,
                    NoResultsOverlay: customNoRowsOverlay,
                    Pagination: RoundedPagination
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
User.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}

export default User
