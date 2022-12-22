import Link from 'next/link'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMdCreate } from 'react-icons/io'

import NavBar from '../NavBar'
import classes from './Header.module.scss'

const Header = (props) => {
  const [searchInput, setSearchInput] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const loginHandler = () => {
    setIsLogin(isLogin)
  }

  const changeSearchInputHandler = (e) => {
    setSearchInput(e.target.value)
  }

  const searchHandler = () => {
    setSearchInput('')
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <img
          className={classes.header__Logo}
          src='/images/logo_header.png'
          alt='logo header'
        />
      </Link>
      {
        isLogin
          ? (
            <Link href='/create-post'>
              <span className={classes.header__create}>Tạo <IoMdCreate /></span>
            </Link>
            )
          : <></>
      }
      <div className={classes.header__search}>
        <input className={classes.header__input} type='text' placeholder='Tìm kiếm' value={searchInput} onChange={changeSearchInputHandler} />
        <button className={classes['header__btn--search']}><FaSearch className={classes['icon__btn--search']} onClick={searchHandler} /></button>
      </div>
      <NavBar isLogin={isLogin} onClick={loginHandler} />
    </header>
  )
}

export default Header
