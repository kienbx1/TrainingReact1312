import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { ADMIN } from '../constant/config'
import { resetState } from '../redux/slices/authSlice'
import { resetCart } from '../redux/slices/cartSlice'

const AvatarUser = ({ user }) => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(resetState())
    dispatch(resetCart())
    window.localStorage.removeItem('cart')
    window.localStorage.removeItem('cartQuantity')
  }

  return (
    <div className='group w-6 relative cursor-pointer'>
      <img src={user?.profilePicUrl} className='rounded-[50%]' />
      <ul className='w-52 shadow-3xl absolute top-7 right-2/4 translate-x-2/4 py-4 px-3 rounded bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500'>
        <li className='p-2 cursor-auto font-semibold text-center border-b-2 border-solid border-black'>{user?.name}</li>
        <Link href='/setting-account'>
          <li className='mt-2 p-2 hover:bg-slate-200 cursor-pointer rounded'>Cài đặt tài khoản</li>
        </Link>
        <Link href='/history-orders'>
          <li className='p-2 hover:bg-slate-200 cursor-pointer rounded'>Lịch sử đơn hàng</li>
        </Link>
        {
          user?.role === ADMIN &&
            <Link
              href={{
                pathname: '/Admin/home'
              }}
            >
              <li className='p-2 hover:bg-slate-200 cursor-pointer rounded'>Trang quản lý</li>
            </Link>
        }
        <Link href='/'>
          <li className='p-2 hover:bg-slate-200 cursor-pointer rounded' onClick={logoutHandler}>Đăng xuất</li>
        </Link>
      </ul>
    </div>
  )
}

export default AvatarUser
