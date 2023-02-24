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
  MenuItem
} from '@mui/material'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

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
        return (
          <>
            <Avatar src={params.row.profilePicUrl} />
          </>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Tài khoản',
      width: 200,
      editable: true
    },
    {
      field: 'pass',
      headerName: 'Mật khẩu',
      width: 200,
      renderCell: (params) => {
        return (
          <Button>Reset</Button>
        )
      }
    },
    {
      field: 'name',
      headerName: 'Tên người dùng',
      width: 150,
      editable: true
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      width: 150,
      editable: true
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      width: 250,
      editable: true
    },
    {
      field: 'role',
      headerName: 'Quản trị',
      width: 100,
      editable: true
    }
  ]
  const cookies = new Cookies()
  const [value, setValue] = useState('1')
  const [open, setOpen] = useState(false)
  const [inputs, setInputs] = useState({})
  const [inf, setInf] = useState([])
  const [delId, setDelId] = useState()
  const [validationPass, setValidationPass] = useState(false)
  const [validationEmail, setValidationEmail] = useState(false)
  const [validationPhone, setValidationPhone] = useState(false)
  const handleClose = () => setOpen(false)

  // Toast
  const mesageSucces = (res) => {
    toast.success(res?.data?.msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  }
  const mesageError = (value) => {
    toast.error(value, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  }

  // Get all data
  useEffect(() => {
    axios({
      url: '/api/auth/',
      method: 'GET',
      data: inputs
    }).then((res) => {
      console.log(res.data)
      setInf(res?.data?.user)
    })
  }, [value])

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
        console.log(res)
        if (res) {
          mesageSucces(res)
        }
      })
      .catch((error) => {
        const err = error?.response?.data?.msg
        if (error) {
          mesageError(err)
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
        if (res) mesageSucces(res)
      })
      .catch((error) => {
        const err = error?.response?.data?.msg
        if (error) {
          mesageError(err)
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
        console.log(res)
        if (res) mesageSucces(res)
      })
      .catch((error) => {
        const err = error?.response?.data?.msg
        if (error) {
          mesageError(err)
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
    <div>
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
                  label='Tên người dùng'
                  variant='outlined'
                  onChange={handleChangeField}
                  name='name'
                />
                <TextField
                  label='Số điện thoại'
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
                  variant='outlined'
                  onChange={handleChangeField}
                  name='address'
                />
                <TextField
                  label='Quản trị'
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
                  setDelId(ids)
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
                  setDelId(ids)
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
