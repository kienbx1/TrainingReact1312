import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'

const NavBar = () => {
  const [active, setActive] = useState(0)

  const activeHandler = (idx) => {
    setActive(idx)
  }

  return (
    <div className='flex items-center gap-x-10'>
      <Link href='/all-items'>
        <div className={`font-bold capitalize cursor-pointer relative before:absolute before:-bottom-2 before:left-0 before:w-0 before:h-1 before:duration-500 before:bg-gradient-to-r before:from-gray-600 before:via-slate-400 before:to-zinc-500 ${active === 1 ? 'before:w-full' : 'hover:before:w-full'}`}>
          <p onClick={() => activeHandler(1)}>Tất cả</p>
        </div>
      </Link>
      <div className={`group relative flex flex-row gap-x-2 items-center font-bold capitalize cursor-pointer before:absolute before:-bottom-2 before:left-0 before:w-0 before:h-1 before:duration-500 before:bg-gradient-to-r before:from-gray-600 before:via-slate-400 before:to-zinc-500 ${active === 2 ? 'before:w-4/5' : 'hover:before:w-4/5'}`}>
        Thương hiệu
        <MdOutlineKeyboardArrowDown className='w-4' />
        <ul className='w-40 shadow-3xl absolute top-7 py-4 px-3 rounded bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500'>
          <Link href='/adidas'>
            <li className='p-2 font-medium hover:bg-slate-200 cursor-pointer rounded' onClick={() => activeHandler(2)}>Adidas</li>
          </Link>
          <Link href='/nike'>
            <li className='p-2 font-medium hover:bg-slate-200 cursor-pointer rounded' onClick={() => activeHandler(2)}>Nike</li>
          </Link>
          <Link href='/converse'>
            <li className='p-2 font-medium hover:bg-slate-200 cursor-pointer rounded' onClick={() => activeHandler(2)}>Converse</li>
          </Link>
        </ul>
      </div>
      <Link href='/sale-off'>
        <div className={`font-bold capitalize cursor-pointer relative before:absolute before:-bottom-2 before:left-0 before:w-0 before:h-1 before:duration-500 before:bg-gradient-to-r before:from-gray-600 before:via-slate-400 before:to-zinc-500 ${active === 3 ? 'before:w-full' : 'hover:before:w-full'}`}>
          <p onClick={() => activeHandler(3)}>Sale off</p>
        </div>
      </Link>
    </div>
  )
}

export default NavBar
