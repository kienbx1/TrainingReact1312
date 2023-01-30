import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineMenuFold, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'

import AvatarUser from '../AvatarUser'
import NavBar from '../NavBar'
import NavBarResponsive from '../NavBarResponsive'

const Header = () => {
  const [isSearchBar, setIsSearchBar] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const changeSearchBarHandler = (e) => {
    setInputValue(e.target.value)
  }

  const searchClickHandler = () => {
    setIsSearchBar(!isSearchBar)
  }

  const openMenuHandler = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <>
      {
      isOpenMenu &&
        <div className=''>
          <div className='bg-white w-[60%] h-screen fixed right-0 z-[4] pt-7 pr-5 pl-8 open-menu'>
            <div className='flex justify-between items-center'>
              <img src='/Images/king-shoes-low-resolution-logo-black-on-transparent-background.png' className='w-16' />
              <div className='w-8 h-8 flex items-center justify-center rounded-[50%] bg-[#F6F7FB]'>
                <FaTimes onClick={openMenuHandler} />
              </div>
            </div>
            <NavBarResponsive />
          </div>
          <div className='absolute top-0 bottom-0 left-0 right-0 bg-slate-900/25 backdrop-blur-none z-[3]' onClick={openMenuHandler} />
        </div>
      }
      <div className='bg-white md:bg-orange-primary pb-[100px]'>
        <div className='mx-auto md:max-w-[85%] sm:max-w-full h-20 bg-white rounded shadow-3xl fixed left-0 right-0 top-2.5 flex items-center z-[2]'>
          <div className='w-full px-4 md:px-10 flex items-center justify-between'>
            <Link href='/'>
              <img src='/Images/king-shoes-low-resolution-logo-black-on-transparent-background.png' className='w-20 cursor-pointer hover:scale-110 duration-500' />
            </Link>
            <NavBar isOpenMenu={isOpenMenu} />
            <div className='flex flex-row gap-5 md:gap-8'>
              <AiOutlineSearch className='text-2xl cursor-pointer hover:scale-105 duration-500' onClick={searchClickHandler} />
              <Link href='/cart'>
                <AiOutlineShoppingCart className='text-2xl cursor-pointer hover:scale-105 duration-500' />
              </Link>
              <AvatarUser username='Trần Phúc Thịnh' />
              <AiOutlineMenuFold className='md:hidden text-2xl' onClick={openMenuHandler} />
            </div>
          </div>
        </div>
        {
        isSearchBar &&
          <div className='absolute top-0 bottom-0 left-0 right-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100 z-[99]'>
            <FaTimes className='absolute right-5 top-5 text-2xl opacity-60 cursor-pointer' onClick={searchClickHandler} />
            <input className='absolute left-1/2 -translate-x-2/4 top-1/4 w-2/5 p-5 shadow-3xl focus:ring focus:border-blue-500 focus:outline-none rounded-xl' placeholder='Nhập vào đôi giày bạn muốn' value={inputValue} onChange={changeSearchBarHandler} />
            <AiOutlineSearch className='absolute text-3xl top-[27%] right-[32%] opacity-60 cursor-pointer' />
          </div>
        }
      </div>
    </>
  )
}

export default Header
