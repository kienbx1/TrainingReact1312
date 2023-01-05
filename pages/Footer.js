import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'
import { MdEmail, MdPhoneEnabled, MdStore } from 'react-icons/md'

const Footer = () => {
  return (
    <footer>
      <div className='border-y-[1px] border-slate-200 border-solid flex md:flex-row md:py-12 md:gap-0 items-start justify-between sm:flex-col sm:gap-5 sm:py-7 sm:px-8'>
        <img src='/Images/king-shoes-low-resolution-logo-black-on-transparent-background.png' className='w-20 md:block self-center sm:hidden' />
        <div className='flex flex-col gap-4'>
          <h1 className='font-semibold text-xl md:mb-2 sm:mb-0'>Về công ty</h1>
          <p className='hover:underline cursor-pointer text-slate-700'>Tuyển dụng</p>
          <p className='hover:underline cursor-pointer text-slate-700'>Liên hệ nhượng quyền</p>
          <p className='hover:underline cursor-pointer text-slate-700'>Về KingShoes</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='font-semibold text-xl mb-2 sm:mb-0'>KingShoes Social</h1>
          <div className='flex gap-3 cursor-pointer hover:underline text-slate-700'>
            <BsFacebook />
            <span>Facebook</span>
          </div>
          <div className='flex gap-3 cursor-pointer hover:underline text-slate-700'>
            <BsInstagram />
            <span>Instagram</span>
          </div>
          <div className='flex gap-3 cursor-pointer hover:underline text-slate-700'>
            <BsYoutube />
            <span>Youtube</span>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='font-semibold text-xl mb-2 sm:mb-0'>Liên hệ</h1>
          <div className='flex gap-3 cursor-pointer hover:underline text-slate-700'>
            <MdEmail />
            <span>Email góp ý</span>
          </div>
          <div className='flex gap-3 cursor-pointer hover:underline text-slate-700'>
            <MdPhoneEnabled />
            <span>Hotline</span>
          </div>
          <div className='flex gap-3 cursor-pointer hover:underline text-slate-700'>
            <MdStore />
            <span>Liên Chiểu - Đà Nẵng</span>
          </div>
        </div>
      </div>
      <p className='text-slate-500 text-center py-6'>&copy; 2022. All rights reserved by Thinh&Tuan.</p>
    </footer>
  )
}

export default Footer
