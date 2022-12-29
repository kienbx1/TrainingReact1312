import Link from 'next/link'
import { useRef, useState } from 'react'
import { AiFillMessage } from 'react-icons/ai'
import { BiDownArrow } from 'react-icons/bi'
import { IoMdNotifications } from 'react-icons/io'

import ListMessages from './ListMessages'
import ListNotifications from './ListNotifications'
import MenuProfile from './MenuProfile'
import classes from './NavBar.module.scss'
import Button from './UI/Button'

const NavBar = (props) => {
  const [isOpenNotification, setIsOpenNotification] = useState(false)
  const [isOpenMessage, setIsOpenMessage] = useState(false)
  const [isOpenMenuProfile, setIsOpenMenuProfile] = useState(false)

  const menuRef = useRef()

  const openNotificationHandler = () => {
    if (isOpenMessage || isOpenMenuProfile) {
      setIsOpenMessage(false)
      setIsOpenMenuProfile(false)
    }
    setIsOpenNotification(!isOpenNotification)
  }

  const openMessageHandler = () => {
    if (isOpenNotification || isOpenMenuProfile) {
      setIsOpenNotification(false)
      setIsOpenMenuProfile(false)
    }
    setIsOpenMessage(!isOpenMessage)
  }

  const openMenuProfileHandler = () => {
    if (isOpenNotification || isOpenMessage) {
      setIsOpenNotification(false)
      setIsOpenMessage(false)
    }
    setIsOpenMenuProfile(!isOpenMenuProfile)
  }

  return (
    <>
      {
        props.isLogin
          ? (
            <div className={classes['header__nav--login']} ref={menuRef}>
              <Button
                className={classes.btn__option}
              >
                <IoMdNotifications className={classes.icon__option} onClick={openNotificationHandler} />
              </Button>
              {
                isOpenNotification
                  ? <ListNotifications setIsOpenNotification={setIsOpenNotification} menuRef={menuRef} />
                  : <></>
              }
              <Button className={classes.btn__option}><AiFillMessage className={classes.icon__option} onClick={openMessageHandler} /></Button>
              {
                isOpenMessage
                  ? <ListMessages setIsOpenMessage={setIsOpenMessage} menuRef={menuRef} />
                  : <></>
              }
              <Link href='/user-profile' passHref legacyBehavior>
                <Button className={classes.btn__option}><img src='/images/avatar_test.png' className={classes.icon__option} /></Button>
              </Link>
              <Button className={classes.btn__option}><BiDownArrow onClick={openMenuProfileHandler} /></Button>
              {
                isOpenMenuProfile
                  ? <MenuProfile setIsOpenMenuProfile={setIsOpenMenuProfile} menuRef={menuRef} />
                  : <></>
              }
            </div>
            )
          : (
            <div className={classes['header__nav--logout']}>
              <div className={classes['header__nav--about-us']}>
                <Link href='/about' passHref legacyBehavior>
                  <p className={classes['about__us--option']}>About</p>
                </Link>
                <Link href='/business' passHref legacyBehavior>
                  <p className={classes['about__us--option']}>Business</p>
                </Link>
                <Link href='/blog' passHref legacyBehavior>
                  <p className={classes['about__us--option']}>Blog</p>
                </Link>
              </div>
              <div className={classes['header__nav--button']}>
                <Button className={classes.button__login} type='button'>
                  Log in
                </Button>
                <Button className={classes.button__signup} type='button'>
                  Sign up
                </Button>
              </div>
            </div>
            )
      }
    </>
  )
}

export default NavBar
