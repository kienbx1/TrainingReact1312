import { useState, useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { IoMdCreate } from 'react-icons/io'

import data from '../utils/data'
import classes from './ListMessages.module.scss'
import Dropdown from './UI/Dropdown'

const ListMessages = (props) => {
  const [listMessages, setListMessages] = useState(data.listMessages)
  const menuRef = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        props.setIsOpenMessage(false)
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const deleteMessageHandler = (idx) => {
    setListMessages(listMessages.filter(message => message.id !== idx))
  }

  return (
    <Dropdown>
      <div className={classes.message__dropdown} ref={menuRef}>
        <div className={classes.message__header}>
          <span className={classes['header__message--title']}>Tin nhắn</span>
          <div className={classes['header__message--create-chat']}>
            <IoMdCreate className={classes.create__icon} />
          </div>
        </div>
        <div className={classes.message__list}>
          {
            listMessages.map(message => (
              <div className={classes.message} key={message.id}>
                <div className={classes.user__avatar}>
                  <img src={message.avatar} className={classes.avatar__image} />
                </div>
                <div className={classes.info__message}>
                  <p className={classes.user__name}>{message.firstName}</p>
                  <span className={classes.user__message}>{message.message}</span>
                  <span className={classes.time__message}>{message.time}</span>
                </div>
                <FaTimes className={classes.icon__delete} onClick={() => deleteMessageHandler(message.id)} />
              </div>
            ))
          }
        </div>
      </div>
    </Dropdown>
  )
}

export default ListMessages
