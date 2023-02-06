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
    setInputValue('')
  }

  const openMenuHandler = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <>
      {
      isOpenMenu &&
        <>
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
        </>
      }
      <div className='bg-white md:bg-orange-primary pb-[100px]'>
        <div className='mx-auto md:max-w-[85%] sm:max-w-full h-20 bg-white rounded shadow-3xl fixed left-0 right-0 top-2.5 flex items-center z-[2]'>
          <div className='w-full px-4 md:px-10 flex items-center justify-between'>
            <Link href='/'>
              <img src='/Images/king-shoes-low-resolution-logo-black-on-transparent-background.png' className='w-20 cursor-pointer hover:scale-110 duration-500' />
            </Link>
            <NavBar />
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
          <div className='absolute w-full h-full bg-slate-900/25 backdrop-blur transition-opacity opacity-100 z-[99]' onClick={searchClickHandler}>
            <FaTimes className='absolute right-5 top-5 text-2xl cursor-pointer' onClick={searchClickHandler} />
            <div
              className='relative bg-white left-1/2 -translate-x-2/4 top-40 w-4/5 md:w-2/5 p-5 shadow-3xl focus:border-blue-500 focus:outline-none rounded-xl'
              onClick={(e) => e.stopPropagation()}
            >
              <input
                className='w-full focus:outline-none'
                placeholder='Nhập vào đôi giày bạn muốn'
                autoFocus
                value={inputValue}
                onChange={changeSearchBarHandler}
              />
              <AiOutlineSearch className='absolute top-0 right-0 -translate-x-2/4 translate-y-2/4 text-3xl opacity-60 cursor-pointer' />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Header
