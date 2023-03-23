import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { HiPhotograph } from 'react-icons/Hi'
import { messageSuccess, messageError } from '../../../components/toastify'
import { lowerCase } from 'lodash'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

const brand = () => {
  const [infBrand, setInfBrand] = useState([])
  const [dataBrand, setDataBrand] = useState({})
  const [images, setImages] = useState()
  const [openModal, setOpenModal] = useState(false)

  // Get all data
  useEffect(() => {
    axios({
      url: '/api/brand/',
      method: 'GET'
    }).then((res) => {
      setInfBrand(res?.data)
    })
  }, [images])

  const handleChangeField = (e) => {
    setDataBrand((prevState) => ({
      ...prevState,
      [e?.target?.name]: e?.target?.value
    }))
  }

  // Process image
  const handleChangeImage = (e) => {
    const file = e.target.files[0]
    file.preView = URL.createObjectURL(file)
    setImages(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpenModal(true)
    const formData = new window.FormData()
    formData.append('banner', images)
    formData.append('name', dataBrand?.brand)
    formData.append('slug', lowerCase(dataBrand?.brand))
    axios({
      url: '/api/brand/',
      method: 'POST',
      data: formData
    })
      .then((res) => {
        if (res) {
          setOpenModal(false)
          messageSuccess(res)
          setDataBrand('')
          setImages('')
        }
      })
      .catch((error) => {
        const err = error?.response?.data?.msg || 'Server Error'
        setOpenModal(false)
        messageError(err)
      })
  }

  // Delete data
  const delData = () => {
    setDataBrand('')
    setImages('')
  }

  return (
    <div className='bg-gradient-to-b h-screen from-slate-200 p-2 mt-16 flex flex-col'>
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

      <div className='flex flex-col mt-4 lg:flex-row justify-around'>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-3 drop-shadow-lg h-fit rounded-xl flex flex-col lg:w-2/4'
        >
          <span className='font-bold text-2xl text-gray-600 p-3'>
            Thêm mới thương hiệu
          </span>
          <input
            type='file'
            name='banner'
            accept='image/*'
            id='name'
            className='hidden'
            onChange={handleChangeImage}
          />
          <label htmlFor='name'>
            <Button className='p-3 bg-slate-200 rounded-lg' component='span'>
              <HiPhotograph size={30} />
              Thêm hình ảnh
            </Button>
          </label>
          <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 h-auto gap-3 border-r-black'>
            {images && (
              <img
                className='w-full object-contain rounded-lg mt-3 drop-shadow-lg'
                src={images?.preView}
              />
            )}
          </div>
          <TextField
            className='mt-6'
            onChange={handleChangeField}
            name='brand'
            value={dataBrand?.brand || ''}
            required
            type='text'
            label='Nhập tên thương hiệu'
          />
          <div className='flex flex-row-reverse justify-items-end mt-2'>
            <Button
              type='submit' variant='outlined' color='success'
              className='border border-separate mb-2 mx-2 p-2 rounded-lg md:w-32 lg:w-64 bg-green-500 cursor-pointer hover:bg-green-600 hover:scale-105 font-bold text-white'
            >
              Thêm mới
            </Button>
            <Button
              className='border border-separate mb-2 mx-2 p-2 rounded-lg md:w-32 lg:w-64 bg-red-500 cursor-pointer hover:bg-red-600 hover:scale-105 font-bold text-white'
              type='button'
              variant='outlined'
              color='error'
              onClick={delData}
            >
              Huỷ
            </Button>
          </div>
        </form>
        <ul>
          {infBrand.map((data, index) => (
            <li
              key={index}
              className='bg-white my-2 p-3 flex flex-row items-center justify-center rounded-lg drop-shadow-lg'
            >
              <img className='rounded-xl mr-3 w-24' src={data?.banner} />
              <TextField
                required
                sx={{ width: '100%' }}
                type='text'
                value={data?.name}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

brand.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default brand
