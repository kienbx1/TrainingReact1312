import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { TabContext } from '@mui/lab'
import 'react-toastify/dist/ReactToastify.css'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Avatar,
  MenuItem,
  DialogContentText,
  Divider
} from '@mui/material'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
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
      field: 'pass',
      headerName: 'Mật khẩu',
      flex: 1,
      width: 200,
      renderCell: (params) => {
        return <Button>Reset</Button>
      }
    },
    {
      field: 'name',
      headerName: 'Tên người dùng',
      flex: 1,
      width: 150,
      editable: true
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      flex: 1,
      width: 150,
      editable: true
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      flex: 1,
      width: 250,
      editable: true
    },
    {
      field: 'role',
      headerName: 'Quản trị',
      flex: 1,
      width: 100,
      editable: true
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              router.push({
                pathname: '/Admin/user/[id]',
                query: { id: params.id }
              })
            }}
          >
            Xem chi tiết
          </Button>
        )
      }
    }
  ]

  const cookies = new Cookies()
  const [value, setValue] = useState('1')
  const [open, setOpen] = useState(false)
  const [openAlertDelRow, setOpenAlertDelRow] = useState(false)
  const [inputs, setInputs] = useState({})
  const [inf, setInf] = useState([])
  const [delId, setDelId] = useState()
  const [validationPass, setValidationPass] = useState(false)
  const [validationEmail, setValidationEmail] = useState(false)
  const [validationPhone, setValidationPhone] = useState(false)
  const handleClose = () => {
    setOpen(false)
    setInputs('')
  }
  const router = useRouter()
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
      data: inputs
    }).then((res) => {
      setInf(res?.data?.user)
    })
  }, [delId])
  // Get value from textField
  const handleChangeField = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e?.target?.name]: e?.target?.value
    }))
  }
  // Add new user
  const handleConfirm = () => {
    axios
      .post('/api/auth/signup', inputs)
      .then((res) => {
        if (res) {
          messageSuccess(res)
          setInputs('')
        }
      })
      .catch((error) => {
        const err = error?.response?.data?.msg
        if (error) {
          messageError(err)
        }
      })
  }
  // Switch tabs
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // Delete user
  const onHandleDel = () => {
    axios({ url: `/api/auth/${delId}`, method: 'DELETE' })
      .then((res) => {
        if (res) messageSuccess(res)
        setDelId('')
      })
      .catch((error) => {
        const err = error?.response?.data?.msg
        if (error) {
          messageError(err)
        }
      })
  }
  // Update user
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow }
    const field = {
      name: newRow.name,
      email: newRow.email,
      password: newRow.password,
      role: newRow.role,
      address: newRow.address,
      phoneNumber: newRow.phoneNumber,
      profilePicUrl: newRow.profilePicUrl
    }
    // Gọi api update row
    axios({
      url: '/api/auth/me',
      method: 'PUT',
      data: field,
      headers: { Authorization: `${cookies.get('token')}` }
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
  const EditToolbar = () => {
    const handleOpen = () => setOpen(true)
    return (
      <GridToolbarContainer>
        <Stack spacing={2} direction='row'>
          <Button
            startIcon={<FaPlus size={15} />}
            color='primary'
            variant='outlined'
            onClick={handleOpen}
          >
            Thêm mới
          </Button>
          <Button
            startIcon={<FaTrashAlt size={15} />}
            color='error'
            variant='outlined'
            onClick={() => {
              setOpenAlertDelRow(true)
            }}
          >
            Xoá
          </Button>
        </Stack>
      </GridToolbarContainer>
    )
  }
  return (
    <div className='mt-20 p-6 bg-slate-200 h-full'>
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
                {delId
                  ? 'Bạn có chắc muốn xoá người dùng này'
                  : 'Chưa có người dùng được chọn'}
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box>
              <DialogTitle id='modal-modal-title' variant='h5' component='h2'>
                Thêm mới tài khoản
              </DialogTitle>
              <DialogContent>
                <Box
                  id='modal-modal-description'
                  component='form'
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' }
                  }}
                >
                  <TextField
                    label='Email'
                    value={inputs ? inputs.email : ''}
                    variant='outlined'
                    error={validationEmail}
                    onChange={(e) => {
                      if (
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          e.target.value
                        )
                      ) {
                        setValidationEmail(false)
                        handleChangeField(e)
                      } else {
                        setValidationEmail(true)
                      }
                    }}
                    name='email'
                    required
                  />
                  <TextField
                    label='Mật khẩu'
                    value={inputs ? inputs.password : ''}
                    variant='outlined'
                    required
                    onChange={(e) => {
                      if (e.target.value.length >= 6) {
                        setValidationPass(false)
                        setInputs((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value
                        }))
                      } else {
                        setInputs((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value
                        }))
                        setValidationPass(true)
                      }
                    }}
                    name='password'
                    error={validationPass}
                  />
                  <TextField
                    key='Tên người dùng'
                    value={inputs ? inputs.name : ''}
                    label='Tên người dùng'
                    variant='outlined'
                    onChange={handleChangeField}
                    name='name'
                  />
                  <TextField
                    label='Số điện thoại'
                    value={inputs ? inputs.phoneNumber : ''}
                    variant='outlined'
                    error={validationPhone}
                    onChange={(e) => {
                      if (e.target.value.length === 10) {
                        setValidationPhone(false)
                        setInputs((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value
                        }))
                      } else {
                        setValidationPhone(true)
                        setInputs((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value
                        }))
                      }
                    }}
                    name='phoneNumber'
                  />
                  <TextField
                    label='Địa chỉ'
                    value={inputs ? inputs.address : ''}
                    variant='outlined'
                    onChange={handleChangeField}
                    name='address'
                  />
                  <TextField
                    label='Quản trị'
                    value={inputs ? inputs.role : ''}
                    variant='outlined'
                    select
                    defaultValue='user'
                    onChange={handleChangeField}
                    name='role'
                  >
                    <MenuItem value='user'>User</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                  </TextField>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button variant='outlined' color='error' onClick={handleClose}>
                  Huỷ bỏ
                </Button>
                <Button
                  variant='outlined'
                  color='success'
                  onClick={handleConfirm}
                >
                  Xác nhận
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
          <TabContext value={value}>
            <Box>
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
              <Divider sx={{ mt: 3 }} />
            </Box>
            <TabPanel value='1'>
              <div>
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
                      height: 750,
                      width: '100%'
                    }}
                    rows={inf?.filter((data) => data.role === 'user')}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    editMode='row'
                    processRowUpdate={processRowUpdate}
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{
                      Toolbar: EditToolbar,
                      NoRowsOverlay: customNoRowsOverlay,
                      NoResultsOverlay: customNoRowsOverlay
                    }}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                      setDelId(ids)
                    }}
                  />
                </Box>
              </div>
            </TabPanel>
            <TabPanel
              value='2'
              sx={{
                height: 'calc(100vh - 280px)'
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
                    height: 'calc(100vh - 20px)',
                    width: '100%'
                  }}
                  rows={inf?.filter((data) => data.role === 'admin')}
                  getRowId={(row) => row._id}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  editMode='row'
                  processRowUpdate={processRowUpdate}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{ Toolbar: EditToolbar }}
                  checkboxSelection
                  onSelectionModelChange={(ids) => {
                    setDelId(ids)
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
