import React, { useState, useEffect } from 'react'
import classes from './_UserProfile.module.scss'
import data from '../../constant'
import Button from '../../components/UI/Button'
const tabs = ['posts', 'photos']

const UserProfile = () => {
  const [changes, setChanges] = useState('posts')
  const [posts, setPosts] = useState([])
  const [buttonFollow, setButtonFollow] = useState(true)
  const [textFollow, setTextFollow] = useState('Theo dõi')
  const handleFollow = () => {
    setButtonFollow(!buttonFollow)
    if (buttonFollow) setTextFollow('Đã theo dõi')
    else setTextFollow('Theo dõi')
  }
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${changes}`)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts)
      })
  }, [changes])

  return (
    <>
      <center>
        <div className={classes.profile__container}>
          <div className={classes.profile__avatar}>
            <img
              className={classes['profile__avatar--img']}
              src={data.information[0].image}
            />
            <p className={classes['profile__avatar--name']}>Đỗ Văn Tuấn</p>
            <p className={classes['profile__avatar--uid']}>@vantuan</p>
            <p className={classes['profile__avatar--des']}> world</p>
            <div className={classes.profile__follow}>
              <p className={classes['profile__follow--follower']}>
                2,2k người theo dõi
              </p>
              <p className={classes['profile__follow--following']}>
                8 người đang theo dõi
              </p>
            </div>
            <div className={classes.profile__contact__buttons}>
              <Button className={classes.profile__contact__button}>
                Nhắn tin
              </Button>
              <Button
                onClick={handleFollow}
                className={classes.profile__contact__button}
              >
                {textFollow}
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.profile__saved__buttons}>
            {tabs.map((tab) => (
              <Button
                className={classes.profile__saved__button}
                key={tab}
                onClick={() => {
                  setChanges(tab)
                }}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div>
            {posts.map((post, id) => (
              <img key={post.id} src={post.url} />
            ))}
          </div>
        </div>
      </center>
    </>
  )
}

export default UserProfile
