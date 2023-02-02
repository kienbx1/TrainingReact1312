import React, { useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import Box from '@mui/material/Box'
import Tab from '@material-ui/core/Tab'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import { MenuItem } from '@material-ui/core'

const itemData = {
  branch: 'Nike',
  name: 'Air Jordan VIP',
  price: 200,
  saleOff: true,
  discount: 12,
  id: 1,
  in: 100,
  out: 20,
  imgDisplay: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
  extraImg: [
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_2.webp',
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_3.webp',
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_4.jpg',
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_5.jpg',
    '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_6.webp'
  ],
  sizes: [39, 40, 41, 42, 43, 44],
  des: 'The Nike Air Zoom G.T. Cut 2 helps you stop on a dime and accelerate back into the open lane in a low-to-the-ground design that helps increase court contact while switching direction. Separate the players from the playmakers in a model that’s built on creating separation but supportive enough to help you play all day.'
}
const currencies = [
  {
    value: 'Converse'
  },
  {
    value: 'Adidas'
  },
  {
    value: 'Nike'
  }
]
const DetailProduct = () => {
  const [value, setValue] = useState('1')
  const [valueDiscount, setValueDiscount] = useState(itemData.discount)
  const [urlImage, setUrlImage] = useState(itemData?.extraImg[0])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <div>
        <Box
          component='form'
          mt={2}
          sx={{ width: '100%', height: '500px', typography: 'body1' }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                variant='scrollable'
                allowScrollButtonsMobile
                onChange={handleChange}
              >
                <Tab label='Hình ảnh' value='1' />
                <Tab label='Chi tiết' value='2' />
                <Tab label='Mô tả' value='3' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <Box
                component='form'
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '100%' }
                }}
                noValidate
                autoComplete='off'
              >
                <ImageList
                  sx={{ width: 500, height: 450 }}
                  cols={3}
                  rowHeight={164}
                >
                  {itemData?.extraImg.map((item) => (
                    <ImageListItem key={item}>
                      <img
                        src={`${item}`}
                        srcSet={`${item}`}
                        loading='lazy'
                        onClick={(e) => {
                          setUrlImage(e.target.src)
                          console.log(urlImage)
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor='outlined-adornment-amount'>
                    Link hình ảnh
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-amount'
                    required
                    fullWidth
                    label='Link hình ảnh'
                    value={urlImage}
                    onChange={(e) => {
                      setUrlImage(e.target.value)
                    }}
                  />
                </FormControl>
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              <Box
                component='form'
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '100%' }
                }}
                noValidate
                autoComplete='off'
              >
                <TextField
                  required
                  id='outlined-required'
                  label='Tên sản phẩm'
                  defaultValue={itemData.name}
                />
                <TextField
                  id='outlined-select-currency'
                  select
                  required
                  fullWidth
                  label='Select'
                  defaultValue={itemData.branch}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} fullWidth value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  error={valueDiscount < 0}
                  helperText={valueDiscount < 0 ? 'Nhập lại giá trị' : ' '}
                  required
                  id='outlined-required'
                  type='number'
                  label='Giảm giá'
                  defaultValue={itemData.discount}
                  onChange={(e) => {
                    setValueDiscount(e.target.value)
                  }}
                />
                <TextField
                  required
                  id='outlined-required'
                  type=''
                  label='Giá'
                  defaultValue={
                    itemData.price - (itemData.price * valueDiscount) / 100
                  }
                />
                <TextField
                  id='outlined-select-currency'
                  select
                  required
                  fullWidth
                  label='Select'
                  defaultValue={itemData.branch}
                >
                  {itemData.sizes.map((option) => (
                    <MenuItem key={option} fullWidth value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  required
                  type='number'
                  id='outlined-required'
                  label='Số lượng nhập'
                  defaultValue={itemData.in}
                />
                <TextField
                  required
                  type='number'
                  id='outlined-required'
                  InputProps={{
                    readOnly: true
                  }}
                  label='Số lượng đã bán'
                  defaultValue={itemData.out}
                />
                <TextField
                  required
                  type='number'
                  id='outlined-required'
                  InputProps={{
                    readOnly: true
                  }}
                  label='Số lượng còn lại'
                  defaultValue={itemData.in - itemData.out}
                />
              </Box>
            </TabPanel>
            <TabPanel value='3'>
              <TextField
                id='outlined-textarea'
                label='Nhập mô tả sản phẩm'
                placeholder='Mô tả'
                multiline
                fullWidth
                value={itemData.des}
              />
            </TabPanel>
          </TabContext>

          <button className='bg-green-800 p-3 m-3 rounded-lg text-white hover:bg-green-600'>
            Chỉnh sửa
          </button>
          <button className='bg-red-800 p-3 m-3 rounded-lg text-white hover:bg-red-600'>
            Huỷ bỏ
          </button>
        </Box>
      </div>
    </div>
  )
}
DetailProduct.getLayout = function getLayout (page) {
  return <AdminLayout>{page}</AdminLayout>
}
export default DetailProduct
