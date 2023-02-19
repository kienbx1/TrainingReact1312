import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../components/layouts/AdminLayout'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, Hidden, MenuItem, TextField, Typography } from '@mui/material'
import { SiNike, SiAdidas } from 'react-icons/Si'
import { GiConverseShoe } from 'react-icons/Gi'
import { HiPhotograph } from 'react-icons/Hi'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
const options = [
  {
    value: 'Converse',
    label: (
      <div
        aria-label='delete'
        size='large'
        className='text-black flex flex-row'
      >
        <GiConverseShoe size={30} />
        <Typography className='ml-3' variant='h6'>
          Converse
        </Typography>
      </div>
    )
  },
  {
    value: 'Nike',
    label: (
      <div
        aria-label='delete'
        size='large'
        className='text-black flex flex-row'
      >
        <SiNike size={30} />{' '}
        <Typography variant='h6' className='ml-3'>
          Nike
        </Typography>
      </div>
    )
  },
  {
    value: 'Adidas',
    label: (
      <div
        aria-label='delete'
        size='large'
        className='text-black flex flex-row'
      >
        <SiAdidas size={30} /> <Typography className='ml-3'>Adidas</Typography>
      </div>
    )
  }
]
const AddNewProduct = () => {
  const [inputs, setInputs] = useState({})
  const router = useRouter()
  const [images, setImages] = useState([])
  useEffect(() => {}, [images])
  // Toast message
  const messageSuccess = (res) => {
    toast.success(res?.data?.msg)
  }
  const messageError = (value) => {
    toast.error(value)
  }
  // Get value from textField
  const handleChangeField = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e?.target?.name]: e?.target?.value
    }))
  }
  // Process image
  const handleChangeImage = (e) => {
    const fileArray = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    )
    setImages((images) => images.concat(fileArray))
    Array.from(e.target.files).map((file) => URL.revokeObjectURL(file))
    setInputs((prevState) => ({
      ...prevState,
      [e?.target?.name]: e?.target?.files
    }))
  }
  // Render images
  const renderImages = (src) => {
    return src.map((image, index) => {
      return (
        <img
          className='w-full aspect-[1/2] object-contain rounded-lg mt-3'
          src={image}
          key={index}
          onClick={() => {
            const del = images.filter((item) => item !== image)
            setImages(del)
          }}
        />
      )
    })
  }

  const handleSubmit = (e, actions) => {
    console.log(e, 'updateImage')
    e.preventDefault()

    const formData = new FormData()
    for (let index = 0; index < inputs?.images?.length; index++) {
      console.log(inputs?.images[index])
      formData.append('images', inputs?.images[index])
    }
    formData.append('brand', inputs.brand)
    formData.append('name', inputs.name)
    formData.append('priceInput', inputs.priceInput)
    formData.append('priceSell', inputs.priceSell)
    formData.append('quantity', inputs.quantity)
    formData.append('discount', inputs.discount)
    axios({
      url: '/api/products/',
      method: 'POST',
      data: formData
    })
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

  const delData = () => {
    setInputs('')
  }

  return (
    <div className='bg-gradient-to-b from-slate-100 p-3 flex flex-col mt-10'>
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
      <form
        onSubmit={handleSubmit}
        className='p-10 flex flex-col lg:flex-row justify-evenly w-full h-auto'
      >
        <div>
          <input
            type='file'
            name='images'
            accept='image/*'
            multiple
            id='name'
            className='hidden'
            onChange={(e) => {
              handleChangeImage(e)
            }}
          />
          <label htmlFor='name'>
            <Button className='p-3 bg-slate-200 rounded-lg' component='span'>
              <HiPhotograph size={30} />
              Thêm hình ảnh
            </Button>
          </label>
          <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 h-auto gap-3 border-r-black'>
            {images == '' ? <p className='text-3xl mt-2 font-thin text-black'>Chưa có ảnh được chọn</p> : renderImages(images)}
          </div>
        </div>
        <div className='flex flex-col lg:sticky ml-2'>
          <TextField
            onChange={handleChangeField}
            name='name'
            required
            label='Tên sản phẩm'
            className='mt-3'
            value={inputs ? inputs.name : ''}
          />
          <TextField
            onChange={handleChangeField}
            name='brand'
            required
            select
            value={inputs ? inputs.brand : ''}
            label='Thương hiệu'
            className='mt-3'
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            onChange={handleChangeField}
            name='priceInput'
            required
            type='number'
            value={inputs ? inputs.priceInput : ''}
            label='Giá nhập'
            className='mt-3'
          />
          <TextField
            onChange={handleChangeField}
            name='priceSell'
            required
            value={inputs ? inputs.priceSell : ''}

            type='number'
            label='Giá bán'
            className='mt-3'
          />

          <TextField
            onChange={(e) => {
              setInputs((prevState) => ({
                ...prevState,
                [e?.target?.name]: parseInt(e?.target?.value)
              }))
            }}
            name='discount'
            required
            value={inputs ? inputs.discount : ''}
            type='number'
            label='Phần trăm giảm giá (%)'
            className='mt-3'
          />
          <TextField
            onChange={(e) => {
              setInputs((prevState) => ({
                ...prevState,
                [e?.target?.name]: parseInt(e?.target?.value)
              }))
            }}
            name='quantity'
            required
            value={inputs ? inputs.quantity : ''}
            type='number'
            label='Số lượng nhập'
            className='mt-3'
          />
          <div className='flex flex-row-reverse justify-items-end mt-2'>
            <Button
              className='border border-separate mb-2 p-2 rounded-lg md:w-32 lg:w-64 bg-green-500 cursor-pointer hover:bg-green-600 hover:scale-105 font-bold text-white'
              type='submit'
            >
              Thêm mới
            </Button>
            <input
              className='border border-separate mb-2 p-2 rounded-lg md:w-32 lg:w-64 bg-red-500 cursor-pointer hover:bg-red-600 hover:scale-105 font-bold text-white'
              type='submit'
              value='Huỷ'
              onClick={() => {
                delData()
                router.back()
              }}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
AddNewProduct.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default AddNewProduct
