import { HiOutlineUser } from 'react-icons/hi'
import Link from 'next/link'

const AvatarUser = ({ username }) => {
  return (
    <div className='group w-6 relative cursor-pointer'>
      <HiOutlineUser className='text-2xl hover:scale-105 duration-500' />
      <ul className='w-52 shadow-3xl absolute top-7 right-2/4 translate-x-2/4 py-4 px-3 rounded bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500'>
        <li className='p-2 cursor-auto font-semibold text-center border-b-2 border-solid border-black'>{username}</li>
        <Link href='/setting-account'>
          <li className='mt-2 p-2 hover:bg-slate-200 cursor-pointer rounded'>Cài đặt tài khoản</li>
        </Link>
        <Link href='/history-orders'>
          <li className='p-2 hover:bg-slate-200 cursor-pointer rounded'>Lịch sử đơn hàng</li>
        </Link>
        <Link
          href={{
            pathname: '/Admin/home'
          }} passHref legacyBehavior
        >
          <li className='mt-2 p-2 hover:bg-slate-200 cursor-pointer rounded'>Trang quản lý</li>
        </Link>
        <li className='p-2 hover:bg-slate-200 cursor-pointer rounded '>Đăng xuất</li>
      </ul>
    </div>
  )
}

export default AvatarUser
