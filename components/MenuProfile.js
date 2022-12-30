import Link from 'next/link'
import { useEffect, useRef } from 'react'

import classes from './MenuProfile.module.scss'
import Dropdown from './UI/Dropdown'

const MenuProfile = (props) => {
  const menuRef = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !props.menuRef.current.contains(e.target)) {
        props.setIsOpenMenuProfile(false)
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <Dropdown>
      <div className={classes['menu-profile__dropdown']} ref={menuRef}>
        <Link href='/user-profile' passHref legacyBehavior>
          <div className={classes['menu__info-user']}>
            <img className={classes['info-user__avatar']} src='/images/avatar_test.png' />
            <div className={classes['info-user__text']}>
              <p className={classes['info-user__text--name']}>Trần Phúc Thịnh</p>
              <p className={classes['info-user__text--email']}>thinhdng2001@gmail.com</p>
            </div>
          </div>
        </Link>
        <div className={classes.menu__option}>
          <p className={classes.option}>Thêm tài khoản</p>
          <p className={classes.option}>Chuyển tài khoản</p>
          <p className={classes.option}>Cài đặt thông tin cá nhân</p>
          <p className={classes.option}>Đăng xuất</p>
        </div>
      </div>
    </Dropdown>
  )
}

export default MenuProfile
