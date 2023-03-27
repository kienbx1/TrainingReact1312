import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { HiPhotograph } from 'react-icons/Hi'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { emailRegExp, phoneRegExp } from '../../../constant/config'
import {
  invalidEmailMessage,
  invalidPhoneMessage,
  minLengthMessage
} from '../../../constant/message'
import allCity from '../../../cityDb.json'
import axios from 'axios'
import { messageError, messageSuccess } from '../../../components/toastify'
import { MdOutlineArrowBackIosNew } from 'react-icons/Md'
import { useRouter } from 'next/router'

const index = () => {
  const [dataUser, setDataUser] = useState({})
  const [selectCity, setSelectCity] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState({
    errorTextAddress: '',
    errorTextPhoneNumber: '',
    errorTextPassWord: '',
    errorTextEmail: ''
  })
  const [disableButton, setDisableButton] = useState(true)
  const router = useRouter()
  const userID = router.query.id

  const handleSelectCity = (event) => {
    const nameCity = event.target.value
    handleChangeField(event)
    setSelectCity(allCity.find((city) => city.Name === nameCity))
  }

  useEffect(() => {
    if (userID) {
      axios({ url: `/api/auth/${userID}`, method: 'GET' }).then((res) => {
        if (userID) {
          setDataUser(res?.data?.user)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (
      errorMessage.errorTextAddress === '' &&
      errorMessage.errorTextPhoneNumber === '' &&
      errorMessage.errorTextPassWord === '' &&
      errorMessage.errorTextEmail === ''
    ) {
      setDisableButton(false)
    } else setDisableButton(true)
  }, [dataUser])

  const handleChangeImage = (e) => {
    setOpenModal(true)
    const formData = new window.FormData()
    Array.from(e?.target?.files).map((images) => {
      return formData.append('images', images)
    })
    axios({
      url: '/api/uploadfile/',
      method: 'POST',
      data: formData
    })
      .then((res) => {
        setOpenModal(false)
        messageSuccess(res)
        setDataUser((prev) => ({
          ...prev,
          profilePicUrl: res?.data?.images[0]
        }))
      })
      .catch((error) => {
        const err = error?.response?.data?.msg || 'Server Error'
        setOpenModal(false)
        messageError(err)
      })
  }
  // Get value from textField
  const handleChangeField = (event) => {
    setDataUser((prev) => ({
      ...prev,
      [event?.target?.name]: event?.target?.value
    }))
  }

  const handleCreateUser = (event) => {
    event.preventDefault()
    if (userID) {
      axios
        .put(`/api/auth/${userID}`, dataUser)
        .then((res) => {
          if (res) {
            messageSuccess(res)
          }
        })
        .catch((error) => {
          const err = error?.response?.data?.msg
          if (error) {
            messageError(err)
          }
        })
    } else {
      axios
        .post('/api/auth/signup', dataUser)
        .then((res) => {
          if (res) {
            messageSuccess(res)
            setDataUser('')
          }
        })
        .catch((error) => {
          const err = error?.response?.data?.msg
          if (error) {
            messageError(err)
          }
        })
    }
  }
  return (
    <div className='mt-20 bg-gray-200 p-3 h-fit w-full flex flex-col'>
      <Dialog
        open={openModal}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText
            className='text-gray-500 mt-4 flex flex-row items-center justify-around'
            id='alert-dialog-description'
          >
            <CircularProgress />
            <span className='ml-3'>Loading... </span>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <form
        onSubmit={handleCreateUser}
        className='bg-white p-14 mt-1 drop-shadow-lg h-fit rounded-xl flex flex-col'
      >
        <div className='flex flex-row items-center pb-2'>
          <MdOutlineArrowBackIosNew
            className='cursor-pointer mr-2'
            onClick={() => {
              router.back()
            }}
          />
          <span className='font-bold text-2xl text-gray-600'>
            Thêm mới người dùng
          </span>
        </div>
        <Divider />
        <div className='flex flex-col mt-6'>
          <input
            type='file'
            name='profilePicUrl'
            accept='image/*'
            className='hidden'
            id='avatar'
            onChange={handleChangeImage}
          />
          {dataUser.profilePicUrl
            ? (
              <label className='mt-2 cursor-pointer' htmlFor='avatar'>
                <img
                  className='rounded-full w-28 h-28 mt-3 drop-shadow-lg'
                  src={dataUser.profilePicUrl}
                  alt='avatar'
                />
              </label>
              )
            : (
              <label className='mt-2' htmlFor='avatar'>
                <Button
                  className='p-4 bg-slate-200 rounded-lg border-dashed border-2 border-blue-400'
                  component='span'
                >
                  <HiPhotograph size={30} />
                  Thêm avatar
                </Button>
              </label>
              )}
          <div className='flex flex-col'>
            <label
              htmlFor='inf'
              className='text-2xl font-medium text-gray-800 my-3'
            >
              Thông tin cơ bản
            </label>
            <div className='flex flex-row border-dashed p-2'>
              <div id='inf' className='flex flex-col w-1/2 mx-1'>
                <div className='flex flex-col'>
                  <label className='mt-1'>Email</label>
                  <TextField
                    className='w-full my-3'
                    name='email'
                    variant='outlined'
                    value={dataUser?.email || ''}
                    helperText={errorMessage.errorTextEmail}
                    onChange={(event) => {
                      if (event.target.value.match(emailRegExp)) {
                        setErrorMessage((prev) => ({
                          ...prev,
                          errorTextEmail: ''
                        }))
                        handleChangeField(event)
                      } else {
                        setErrorMessage((prev) => ({
                          ...prev,
                          errorTextEmail: invalidEmailMessage
                        }))
                        handleChangeField(event)
                      }
                    }}
                    required
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='mt-1'>Mật khẩu</label>
                  <TextField
                    variant='outlined'
                    name='password'
                    value={dataUser?.password || ''}
                    className='w-full my-2'
                    required
                    helperText={errorMessage.errorTextPassWord}
                    inputProps={{ maxLength: 30 }}
                    onChange={(event) => {
                      if (event.target.value.length >= 6) {
                        setErrorMessage((prev) => ({
                          ...prev,
                          errorTextPassWord: ''
                        }))
                        handleChangeField(event)
                      } else {
                        setErrorMessage((prev) => ({
                          ...prev,
                          errorTextPassWord: minLengthMessage.replace(
                            'value',
                            6
                          )
                        }))
                        handleChangeField(event)
                      }
                    }}
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='mt-2'>Tên người dùng</label>
                  <TextField
                    variant='outlined'
                    name='name'
                    value={dataUser?.name || ''}
                    onChange={handleChangeField}
                    className='my-2'
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='mt-2'>Số điện thoại</label>
                  <TextField
                    className='my-2'
                    name='phoneNumber'
                    value={dataUser?.phoneNumber || ''}
                    helperText={errorMessage.errorTextPhoneNumber}
                    variant='outlined'
                    onChange={(event) => {
                      if (event.target.value.match(phoneRegExp)) {
                        setErrorMessage((prev) => ({
                          ...prev,
                          errorTextPhoneNumber: ''
                        }))
                        handleChangeField(event)
                      } else {
                        setErrorMessage((prev) => ({
                          ...prev,
                          errorTextPhoneNumber: invalidPhoneMessage
                        }))
                        handleChangeField(event)
                      }
                    }}
                  />
                </div>
              </div>
              <div id='location' className='flex flex-col w-1/2 mx-1'>
                <div className='flex flex-col'>
                  <label className='mt-2'>Tỉnh/Thành phố</label>
                  <Select
                    className='my-2'
                    value={dataUser?.city || ''}
                    variant='outlined'
                    select
                    name='city'
                    MenuProps={{
                      style: {
                        maxHeight: 200
                      }
                    }}
                    onChange={(e) => {
                      handleSelectCity(e)
                    }}
                  >
                    {allCity.map((city, index) => {
                      return (
                        <MenuItem
                          name='city'
                          className='cursor-pointer'
                          onChange={handleChangeField}
                          value={city.Name}
                          key={index}
                        >
                          {city.Name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </div>
                <div className='flex flex-col'>
                  <label className='mt-2'>Quận/Huyện</label>
                  <Select
                    className='my-2'
                    variant='outlined'
                    select
                    name='districts'
                    onChange={(e) => {
                      handleChangeField(e)
                    }}
                    value={dataUser?.districts || ''}
                    MenuProps={{
                      style: {
                        maxHeight: 200
                      }
                    }}
                  >
                    {selectCity?.Districts?.map((districts, index) => {
                      return (
                        <MenuItem
                          className='cursor-pointer'
                          value={districts.Name}
                          key={index}
                        >
                          {districts.Name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </div>
                <div className='flex flex-col'>
                  <label className='mt-2'>Địa chỉ</label>
                  <TextField
                    className='my-2'
                    variant='outlined'
                    name='address'
                    value={dataUser?.address || ''}
                    helperText={errorMessage.errorTextAddress}
                    onChange={(event) => {
                      if (event.target.value.length >= 6) {
                        setErrorMessage((prev) => ({
                          ...prev,
                          errorTextAddress: ''
                        }))
                        handleChangeField(event)
                      } else {
                        setErrorMessage((prev) => ({
                          ...prev,
                          errorTextAddress: minLengthMessage.replace(
                            'value',
                            6
                          )
                        }))
                        handleChangeField(event)
                      }
                    }}
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='mt-2'>Phân quyền</label>
                  <TextField
                    className='my-2'
                    variant='outlined'
                    select
                    value={dataUser?.role || 'user'}
                    onChange={handleChangeField}
                    name='role'
                  >
                    <MenuItem value='user'>User</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                  </TextField>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row-reverse justify-items-end mt-2'>
          <Button
            disabled={disableButton}
            className='border border-separate bg-green-500 mb-2 mx-2 p-2 rounded-lg md:w-32 lg:w-64 font-bold'
            variant='contained'
            color='success'
            type='submit'
          >
            {userID ? 'Cập nhật' : 'Thêm mới'}
          </Button>
          <Button
            className='border mx-2 border-separate mb-2 p-2 bg-red-500 rounded-lg md:w-32 lg:w-64 font-bold'
            type='button'
            color='error'
            variant='contained'
            sx={{ bgcolor: 'red' }}
            value='Huỷ'
            onClick={() => {
              setDataUser([])
            }}
          >
            Huỷ
          </Button>
        </div>
      </form>
    </div>
  )
}

index.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default index
