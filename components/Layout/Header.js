import Link from 'next/link'
import Button from '../UI/Button'
import { FaSearch } from 'react-icons/fa'

import classes from './Header.module.scss'
import logoHeader from '../../assets/image/logo_header.png'
import { useState } from 'react'

function Header (props) {
  const [searchInput, setSearchInput] = useState('')

  const changeSearchInputHandler = (e) => {
    setSearchInput(e.target.value)
  }

  const searchHandler = () => {
    console.log('Header ~ searchInput', searchInput)
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <img
          className={classes.headerLogo}
          src={logoHeader.src}
          alt='logo header'
        />
      </Link>
      <div className={classes.headerSearch}>
        <input className={classes.headerInput} type='text' placeholder='Tìm kiếm' value={searchInput} onChange={changeSearchInputHandler} />
        <button className={classes.headerBtnSearch}><FaSearch className={classes.iconBtnSearch} onClick={searchHandler} /></button>
      </div>
      <div className={classes.headerNav}>
        <div className={classes.headerNavAboutUs}>
          <Link href='/about'>
            <p className={classes.aboutUsOption}>About</p>
          </Link>
          <Link href='/business'>
            <p className={classes.aboutUsOption}>Business</p>
          </Link>
          <Link href='/blog'>
            <p className={classes.aboutUsOption}>Blog</p>
          </Link>
        </div>
        <div className={classes.headerNavButton}>
          <Button
            className={classes.buttonLogin}
            type='button'
          >
            Log in
          </Button>
          <Button className={classes.buttonSignup} type='button'>
            Sign up
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
