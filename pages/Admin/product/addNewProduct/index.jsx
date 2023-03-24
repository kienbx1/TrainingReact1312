import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../components/layouts/AdminLayout'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import { HiPhotograph } from 'react-icons/Hi'
import { messageSuccess, messageError } from '../../../../components/toastify'
import { MdOutlineCancel, MdOutlineArrowBackIosNew } from 'react-icons/Md'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

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
  const [openModal, setOpenModal] = useState(false)
  const productID = router.query.id
  // Get all brand
  useEffect(() => {
    axios({
      url: '/api/brand/',
      method: 'GET'
    }).then((res) => {
      setInfBrand(res?.data)
    })
  }, [])

  // Gọi api tìm kiếm theo idproduct
  useEffect(() => {
    if (productID) {
      axios({ url: `/api/products/${productID}`, method: 'GET' }).then(
        (res) => {
          if (productID) {
            setDataProduct(res?.data?.products)
          }
          setImages(res?.data?.products?.images)
        }
      )
    }
  }, [productID])

  // Get value from textField
  const handleChangeField = (e) => {
    setDataProduct((prevState) => ({
      ...prevState,
      [e?.target?.name]: e?.target?.value
    }))
  }
  // Process image
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
        setDataProduct((prevState) => ({
          ...prevState,
          images: res.data.images
        }))
      })
      .catch((error) => {
        const err = error?.response?.data?.msg || 'Server Error'
        setOpenModal(false)
        messageError(err)
      })
  }
  // Render images
  const renderImage = () => {
    return dataProduct.images?.map((data, index) => {
      return (
        <div key={index} className='relative'>
          <img
            className='w-full object-contain rounded-lg mt-2 drop-shadow-lg'
            src={data}
          />
          <MdOutlineCancel
            size={20}
            onClick={() => {
              const delAnImageInPreview = dataProduct.images.filter(
                (item) => item !== data
              )
              setDataProduct((prevState) => ({
                ...prevState,
                images: delAnImageInPreview
              }))
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
    setOpenModal(!openModal)
    if (productID) {
      axios({
        url: `/api/products/${productID}`,
        method: 'PUT',
        data: dataProduct
      })
        .then((res) => {
          setOpenModal(false)
          messageSuccess(res)
        })
        .catch((error) => {
          const err = error?.response?.data?.msg || 'Server Error'
          setOpenModal(false)
          messageError(err)
        })
    } else {
      axios({
        url: '/api/products/',
        method: 'POST',
        data: dataProduct
      })
        .then((res) => {
          setOpenModal(false)
          messageSuccess(res)
          setDataProduct([])
          setImages([])
        })
        .catch((error) => {
          const err = error?.response?.data?.msg || 'Server Error'
          setOpenModal(false)
          messageError(err)
        })
    }
  }

  // Delete data
  const delData = () => {
    setImages([])
    setDataProduct('')
  }

  return (
    <div className='bg-gray-200 h-screen rounded-t-2xl p-3 flex flex-col pt-24'>
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
      <div className='bg-white rounded-xl p-3 h-screen'>
        <span className='w-full text-xl p-5 flex flex-row items-center'>
          <MdOutlineArrowBackIosNew
            className='mr-2 cursor-pointer'
            onClick={() => {
              router.back()
            }}
          />
          {productID ? 'Chi tiết sản phẩm' : 'Thêm mới sản phẩm'}
        </span>
        <Divider sx={{ mt: 2 }} />
        <form
          onSubmit={handleSubmit}
          className='p-10 flex flex-col justify-evenly w-full h-auto'
        >
          <div className=' mb-10'>
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
            <label>
              <Button
                className='bg-slate-200 lg:p-12 md:p-8 border-2 border-dashed rounded-lg'
                component='span'
              >
                <HiPhotograph size={30} />
                Thêm hình ảnh
              </Button>
            </label>
            <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 h-auto gap-3 border-r-black'>
              {renderImage(images)}
            </div>
          </div>
          <label className='mt-3'>
            Tên sản phẩm
          </label>
          <div className='flex flex-col bg-white rounded-xl'>
            <TextField
              onChange={handleChangeField}
              name='name'
              required
              className='mt-3'
              value={dataProduct?.name || ''}
            />
            <label className='mt-3'>
              Thương hiệu
            </label>
            <TextField
              onChange={handleChangeField}
              name='brandId'
              required
              multiple
              select
              value={dataProduct?.brandId || ''}
              className='mt-3'
            >
              {infBrand.map((brand, index) => {
                return (
                  <MenuItem key={index} value={brand._id}>
                    <div
                      size='large'
                      className='text-black flex flex-row items-center'
                    >
                      <img className='rounded-lg w-14' src={brand.banner} />
                      <Typography variant='h6' className='ml-3'>
                        {brand.name}
                      </Typography>
                    </div>
                  </MenuItem>
                )
              })}
            </TextField>
            <label className='mt-3'>
              Kích cỡ
            </label>
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
            <div className='flex flex-row w-full'>
              <div className='flex flex-col w-full'>
                <label className='mt-3'>
                  Giá nhập
                </label>
                <TextField
                  onChange={handleChangeField}
                  name='priceInput'
                  required
                  type='number'
                  value={dataProduct?.priceInput || ''}
                  className='mt-2 w-full pr-1'
                />
              </div>
              <div className='flex flex-col w-full'>
                <label className='mt-3'>
                  Giá bán
                </label>
                <TextField
                  onChange={handleChangeField}
                  name='price'
                  required
                  value={dataProduct?.price || ''}
                  type='number'
                  className='mt-2 w-full pl-1'
                />
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='flex flex-col w-full'>
                <label className='mt-3'>
                  Giảm giá (%)
                </label>
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
                  className='mt-2 w-full pr-1'
                />
              </div>
              <div className='flex flex-col w-full'>
                <label className='mt-3'>
                  Số lượng nhập
                </label>
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
                  className='mt-2 w-full pl-1'
                />
              </div>
            </div>
            <div className='flex flex-row-reverse justify-items-end mt-2'>
              <Button
                className='border border-separate mb-2 mx-2 p-2 rounded-lg md:w-32 lg:w-64 bg-green-500 cursor-pointer hover:bg-green-600 hover:scale-105 font-bold text-white'
                type='submit'
              >
                {productID ? 'Cập nhật' : 'Thêm mới'}
              </Button>
              <Button
                className='border mx-2 border-separate mb-2 p-2 rounded-lg md:w-32 lg:w-64 bg-red-500 cursor-pointer hover:bg-red-600 hover:scale-105 font-bold text-white'
                type='button'
                value='Huỷ'
                onClick={() => {
                  delData()
                }}
              >
                Huỷ
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
AddNewProduct.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default AddNewProduct
