import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const NavBar = () => {
  const router = useRouter()
  const [navbarOptions, setNavbarOptions] = useState([])

  useEffect(async() => {
    const response = await axios.get('/api/brand');
    setNavbarOptions(response.data)
  }, [])


  return (
    <div className='hidden md:flex items-center gap-x-10'>
      <Link
        href={{
          pathname: '/product-list',
          query: { name: 'all-items' }
        }}
      >
        <div className={`font-bold capitalize cursor-pointer relative before:absolute before:-bottom-2 before:left-0 before:w-0 before:h-1 before:duration-500 before:bg-gradient-to-r before:from-gray-600 before:via-slate-400 before:to-zinc-500 ${router.pathname === '/all-items' ? 'before:w-full' : 'hover:before:w-full'}`}>
          Tất cả
        </div>
      </Link>
      <div className={`group relative flex flex-row gap-x-2 items-center font-bold capitalize cursor-pointer before:absolute before:-bottom-2 before:left-0 before:w-0 before:h-1 before:duration-500 before:bg-gradient-to-r before:from-gray-600 before:via-slate-400 before:to-zinc-500 ${(router.pathname === '/adidas' || router.pathname === '/nike' || router.pathname === '/converse') ? 'before:w-4/5' : 'hover:before:w-4/5'}`}>
        Thương hiệu
        <MdOutlineKeyboardArrowDown className='w-4' />
        <ul className='w-40 shadow-3xl absolute top-7 py-4 px-3 rounded bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500'>
          {
            navbarOptions.map((option, index) => {
              return (
                <Link
                  href={{
                    pathname: '/product-list',
                    query: { name: option.slug }
                  }}
                  key={index}
                >
                  <li className='p-2 font-medium hover:bg-slate-200 cursor-pointer rounded'>{option.name}</li>
                </Link>
              )
            })
          }
        </ul>
      </div>
      <Link
        href={{
          pathname: '/product-list',
          query: { name: 'sale-off' }
        }}
      >
        <div className={`font-bold capitalize cursor-pointer relative before:absolute before:-bottom-2 before:left-0 before:w-0 before:h-1 before:duration-500 before:bg-gradient-to-r before:from-gray-600 before:via-slate-400 before:to-zinc-500 ${router.pathname === '/sale-off' ? 'before:w-full' : 'hover:before:w-full'}`}>
          Sale off
        </div>
      </Link>
    </div>
  )
}

export default NavBar
