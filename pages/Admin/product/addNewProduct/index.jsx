import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../components/layouts/AdminLayout'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { HiPhotograph } from 'react-icons/Hi'
import { messageSuccess, messageError } from '../../../../components/toastify'
import { MdOutlineCancel } from 'react-icons/Md'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

// multiple shoes's size
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const listSize = ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43']

const AddNewProduct = () => {
  const [dataProduct, setDataProduct] = useState({})
  const router = useRouter()
  const [images, setImages] = useState([])
  const [infBrand, setInfBrand] = useState([])

  // Get all brand
  useEffect(() => {
    axios({
      url: '/api/brand/',
      method: 'GET'
    }).then((res) => {
      setInfBrand(res?.data)
    })
  }, [])

  // Get value from textField
  const handleChangeField = (e) => {
    setDataProduct((prevState) => ({
      ...prevState,
      [e?.target?.name]: e?.target?.value
    }))
  }

  // Process image
  const handleChangeImage = (e) => {
    setDataProduct((prevState) => ({
      ...prevState,
      [e?.target?.name]: e?.target?.files
    }))
    const fileArray = Array.from(e?.target?.files).map((file) =>
      URL.createObjectURL(file)
    )
    setImages((images) => images.concat(fileArray))
    Array.from(e?.target?.files).map((file) => URL.revokeObjectURL(file))
  }

  // Render images
  const renderImage = (src) => {
    return src?.map((data, index) => {
      return (
        <div key={index} className='relative'>
          <img
            className='w-full object-contain rounded-lg mt-3 drop-shadow-lg'
            src={data}
          />
          <MdOutlineCancel
            size={20}
            onClick={() => {
              const delAnImageInPreview = images.filter((item) => item !== data)
              setImages(delAnImageInPreview)
            }}
            className='absolute top-4 right-1 text-red-600 cursor-pointer hover:scale-105'
          />
        </div>
      )
    })
  }

  // Call api create product
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new window.FormData()
    Array.from(dataProduct?.images).map((file) => {
      return formData.append('images', file)
    })
    formData.append('brandId', dataProduct?.brand)
    formData.append('name', dataProduct?.name)
    formData.append('priceInput', dataProduct?.priceInput)
    formData.append('price', dataProduct?.priceSell)
    formData.append('quantity', dataProduct?.quantity)
    formData.append('discount', dataProduct?.discount)
    Array.from(dataProduct?.sizes).map((size) => {
      return formData.append('sizes', size)
    })
    axios({
      url: '/api/products/',
      method: 'POST',
      data: formData
    })
      .then((res) => {
        messageSuccess(res)
        setDataProduct([])
        setImages([])
      })
      .catch((error) => {
        const err = error?.response?.data?.msg || 'Server Error'
        messageError(err)
      })
  }

  // Delete data
  const delData = () => {
    setImages([])
    setDataProduct('')
  }

  return (
    <div className='bg-gradient-to-b from-slate-100 p-3 flex flex-col mt-10'>
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
            {images.length === 0
              ? (
                <p className='text-3xl mt-2 font-thin text-black'>
                  Chưa có ảnh được chọn
                </p>
                )
              : (
                  renderImage(images)
                )}
          </div>
        </div>
        <div className='flex flex-col lg:sticky lg:ml-20'>
          <TextField
            onChange={handleChangeField}
            name='name'
            required
            label='Tên sản phẩm'
            className='mt-3'
            value={dataProduct?.name || ''}
          />
          <TextField
            onChange={handleChangeField}
            name='brand'
            required
            multiple
            select
            value={dataProduct?.brand || ''}
            label='Thương hiệu'
            className='mt-3'
          >
            {infBrand.map((brand, index) => (
              <MenuItem key={index} value={brand._id}>
                <div
                  aria-label='delete'
                  size='large'
                  className='text-black flex flex-row items-center'
                >
                  <img className='rounded-lg w-14' src={brand.banner} />
                  <Typography variant='h6' className='ml-3'>
                    {brand.name}
                  </Typography>
                </div>
              </MenuItem>
            ))}
          </TextField>
          <Select
            className='mt-3'
            required
            multiple
            displayEmpty
            label='Size'
            name='sizes'
            value={dataProduct?.sizes || []}
            onChange={handleChangeField}
            input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
            renderValue={(selected) => {
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected?.map((value, index) => (
                    <Chip key={index} label={value} />
                  ))}
                </Box>
              )
            }}
            MenuProps={MenuProps}
          >
            {listSize.map((size, index) => (
              <MenuItem key={index} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
          <TextField
            onChange={handleChangeField}
            name='priceInput'
            required
            type='number'
            value={dataProduct?.priceInput || ''}
            label='Giá nhập'
            className='mt-3'
          />
          <TextField
            onChange={handleChangeField}
            name='priceSell'
            required
            value={dataProduct?.priceSell || ''}
            type='number'
            label='Giá bán'
            className='mt-3'
          />
          <TextField
            onChange={(e) => {
              setDataProduct((prevState) => ({
                ...prevState,
                [e?.target?.name]: parseInt(e?.target?.value)
              }))
            }}
            name='discount'
            required
            value={dataProduct?.discount || ''}
            type='number'
            label='Phần trăm giảm giá (%)'
            className='mt-3'
          />
          <TextField
            onChange={(e) => {
              setDataProduct((prevState) => ({
                ...prevState,
                [e?.target?.name]: parseInt(e?.target?.value)
              }))
            }}
            name='quantity'
            required
            value={dataProduct?.quantity || ''}
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
              type='button'
              value='Huỷ'
              onClick={() => {
                delData()
              }}
              onDoubleClick={() => {
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
