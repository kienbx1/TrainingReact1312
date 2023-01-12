import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import UserLayout from '../../components/layouts/UserLayout'

const detailImg = [
  {
    name: 'Air Jordan 7 Retro Se',
    price: 500,
    imgs: [
      '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp',
      '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_2.webp',
      '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_3.webp',
      '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_4.webp',
      '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_5.webp',
      '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_6.webp'
    ],
    sizes: [36, 37, 38, 39, 40, 41, 42]
  }
]

const DetailProduct = () => {
  const [countProduct, setCountProduct] = useState(1)
  const [urlImg, setUrlImg] = useState(detailImg[0]?.imgs[0])
  const [price, setPrice] = useState(detailImg[0]?.price)

  const handleIncreaseProduct = () => {
    setCountProduct((countProduct) => countProduct + 1)
    setPrice((price) => price + detailImg[0]?.price)
  }

  const handleDecreaseProduct = () => {
    setCountProduct((countProduct) => countProduct - 1)
    setPrice((price) => price - detailImg[0]?.price)
  }

  return (
    <div className='flex flex-col xl:flex-row justify-center'>
      <div className='hidden xl:grid xl:grid-cols-2 xl:gap-2  flex-col justify-center'>
        {detailImg[0]?.imgs.map((img) => (
          <img key={img} src={img} />
        ))}
      </div>
      <div className='flex flex-col justify-center xl:hidden '>
        <div className=''>
          <img className='w-full' src={urlImg} />
        </div>
        <div className=' xl:hidden flex flex-wrap flex-row justify-center'>
          {detailImg[0]?.imgs.map((img) => (
            <img
              key={img}
              onClick={() => {
                setUrlImg(img)
              }}
              className='w-28'
              src={img}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-col pl-5 w-full'>
        <p className='font-bold text-3xl mt-2'>Air Jordan 7 RetroSe</p>
        <p className='font-semibold text-xl mt-5'>500 VNĐ</p>
        <p className='font-normal text-xl mt-5'>Chọn size :</p>
        <div className='grid xl:grid-cols-4 gap-4 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-2 flex-col justify-center'>
          {detailImg[0]?.sizes.map((size) => (
            <button
              key={size}
              className='border-solid border border-gray-200 hover:scale-105 focus:scale-105 focus:border-black focus:text-2xl focus:bg-slate-400 rounded-xl text-center w-full h-10 leading-10'
            >
              {size}
            </button>
          ))}
        </div>
        <div className='flex mt-2'>
          <button
            className={
              countProduct <= 0
                ? 'hidden'
                : 'w-7 h-7 rounded-full bg-slate-300 focus:bg-slate-500 text-xl flex flex-col justify-around items-center'
            }
            onClick={handleDecreaseProduct}
          >
            <FaMinus />
          </button>
          <input
            type='number'
            value={countProduct}
            onChange={(e) => {
              setCountProduct(parseInt(e?.target?.value))
              setPrice((price) => price * parseInt(e?.target?.value))
            }}
            className='ml-5  p-2 mr-5 flex items-center text-xl'
          />
          <button
            className='w-7 h-7 rounded-full bg-slate-300 focus:bg-slate-500 text-xl flex flex-col justify-around items-center'
            onClick={handleIncreaseProduct}
          >
            <FaPlus />
          </button>
        </div>
        <p className='font-semibold text-xl mt-5'>Tổng tiền : {price} VNĐ</p>
        <button className='w-1/3 h-12 bg-black text-white rounded-xl text-center leading-10 mt-5'>
          Mua ngay
        </button>
        <button className='w-1/3 h-12 leading-10 text-black rounded-xl text-center border border-black mt-3'>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  )
}

DetailProduct.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default DetailProduct
