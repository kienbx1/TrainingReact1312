import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { TabContext } from '@mui/lab'
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
  MenuItem
} from '@mui/material'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'

const tabs = [
  { label: 'Người dùng', value: '1' },
  { label: 'Người quản trị', value: '2' }
]

const User = () => {
  const columns = [
    {
      headerName: 'Avatar',
      width: 100,
      editable: true,
      renderCell: (params) => {
        return (
          <div className='relative'>
            <Avatar src={params?.row?.profilePicUrl} />
            <span
              className={`top-0 left-7 absolute w-3.5 h-3.5 ${
                params?.row?.isOnline ? 'bg-green-500' : 'bg-red-500'
              } border-2 border-white dark:border-gray-800 rounded-full`}
            />
          </div>
        )
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
  const [inputs, setInputs] = useState({})
  const [inf, setInf] = useState([])
  const [delIdUser, setDelIdUser] = useState()
  const [validationPass, setValidationPass] = useState(false)
  const [validationEmail, setValidationEmail] = useState(false)
  const [validationPhone, setValidationPhone] = useState(false)
  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
    setInputs('')
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
      data: inputs
    }).then((res) => {
      setInf(res?.data?.user)
    })
  }, [delIdUser])

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
        messageSuccess(res)
        setInputs('')
      })
      .catch((error) => {
        const err = error?.response?.data?.msg || 'Server Error'
        messageError(err)
      })
  }

  // Switch tab
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // Delete user
  const onHandleDel = () => {
    axios({ url: `/api/auth/${delIdUser}`, method: 'DELETE' })
      .then((res) => {
        messageSuccess(res)
        setDelIdUser('')
      })
      .catch((error) => {
        const err = error?.response?.data?.msg || 'Server Error'
        messageError(err)
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
        const err = error?.response?.data?.msg || 'Server Error'
        messageError(err)
      })
    return updatedRow
  }

  const EditToolbar = () => {
    const handleOpen = () => setOpen(true)
    return (
      <GridToolbarContainer>
        <Stack spacing={2} direction='row'>
          <Button
            startIcon={<FaPlus />}
            color='primary'
            variant='outlined'
            onClick={handleOpen}
          >
            Thêm mới
          </Button>
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

  return (
    <div className='mt-16'>
      <Box
        component='form'
        sx={{
          height: 500,
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Box sx={{ height: 650, width: '100%' }}>
              <DataGrid
                rows={inf?.filter((data) => data.role === 'user')}
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
                  setDelIdUser(ids)
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value='2'>
            <Box sx={{ height: 650, width: '100%' }}>
              <DataGrid
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
                  setDelIdUser(ids)
                }}
              />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}
User.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}

export default User
