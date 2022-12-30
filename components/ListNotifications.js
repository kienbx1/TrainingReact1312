import { useEffect, useRef } from 'react'

import data from '../utils/data'
import classes from './ListNotifications.module.scss'
import Dropdown from './UI/Dropdown'

const ListNotifications = (props) => {
  const menuRef = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !props.menuRef.current.contains(e.target)) {
        props.setIsOpenNotification(false)
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <Dropdown>
      <div className={classes.notification__dropdown} ref={menuRef}>
        <p className={classes.notification__title}>Thông báo</p>
        <div className={classes.notification__list}>
          {data.listNotifications.map(notification => (
            <div className={classes.notification__user} key={notification.id}>
              <div className={classes.user__avatar}>
                <img src={notification.avatar} className={classes.avatar__image} />
              </div>
              <p className={classes.user__action}><span className={classes.user__name}>{notification.firstName}</span> {notification.action}</p>
            </div>
          ))}
        </div>
      </div>
    </Dropdown>
  )
}

export default ListNotifications
