import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'

import AvatarUser from '../AvatarUser'
import NavBar from '../NavBar'

const Header = () => {
  const [isSearchBar, setIsSearchBar] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const changeSearchBarHandler = (e) => {
    setInputValue(e.target.value)
  }

  const searchClickHandler = () => {
    setIsSearchBar(!isSearchBar)
  }

  return (
    <div className='bg-orange-primary pb-28'>
      <div className='mx-auto md:max-w-[85%] sm:max-w-full h-20 bg-white rounded shadow-3xl fixed left-0 right-0 top-2.5 flex items-center'>
        <div className='w-full px-10 flex items-center justify-between'>
          <Link href='/'>
            <img src='/Images/king-shoes-low-resolution-logo-black-on-transparent-background.png' className='w-20 cursor-pointer hover:scale-110 duration-500' />
          </Link>
          <NavBar />
          <div className='flex flex-row gap-x-8'>
            <AiOutlineSearch className='text-2xl cursor-pointer hover:scale-105 duration-500' onClick={searchClickHandler} />
            <Link href='/cart'>
              <AiOutlineShoppingCart className='text-2xl cursor-pointer hover:scale-105 duration-500' />
            </Link>
            <AvatarUser username='Trần Phúc Thịnh' />
          </div>
        </div>
      </div>
      {
      isSearchBar &&
        <div className='absolute top-0 bottom-0 left-0 right-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100'>
          <FaTimes className='absolute right-5 top-5 text-2xl opacity-60 cursor-pointer' onClick={searchClickHandler} />
          <input className='absolute left-1/2 -translate-x-2/4 top-1/4 w-2/5 p-5 shadow-3xl focus:ring focus:border-blue-500 focus:outline-none rounded-xl' placeholder='Nhập vào đôi giày bạn muốn' value={inputValue} onChange={changeSearchBarHandler} />
          <AiOutlineSearch className='absolute text-3xl top-[27%] right-[32%] opacity-60 cursor-pointer' />
        </div>
      }
    </div>
  )
}

export default Header
