import Button from '../../components/UI/Button'
import React, { useState } from 'react'
import styles from './_DetailPost.module.scss'
import {
  FaShare,
  FaAngleDown,
  FaDownload,
  FaLink,
  FaArrowLeft
} from 'react-icons/fa'
import ShareLink from 'react-facebook-share-link'
import ListPosts from '../../components/UI/ListPosts'
import { useRouter } from 'next/router'
import Link from 'next/link'

const DetailPost = () => {
  const { query } = useRouter()
  const [comment, setComment] = useState('')
  const [buttonFollow, setButtonFollow] = useState(true)
  const [textFollow, setTextFollow] = useState('Theo dõi')
  const router = useRouter()
  const cancelCommnent = () => {
    setComment('')
  }
  const handleComment = (e) => {
    setComment(e.target.value)
  }
  const handleFollow = () => {
    setButtonFollow(!buttonFollow)
    if (buttonFollow) setTextFollow('Đã theo dõi')
    else setTextFollow('Theo dõi')
  }

  return (
    <>
      <div className={styles.absolute__elements}>
        <Button
          onClick={() => router.back()}
          className={styles.absolute__element}
        >
          <FaArrowLeft />
        </Button>
      </div>
      <center>
        <div className={styles.detail__group}>
          <div>
            <img className={styles['detail__group--left']} src={query.img} />
          </div>
          <div className={styles['detail__group--right']}>
            <div className={styles.detail__group__buttons}>
              <Button className={styles.detail__group__button}>
                <FaDownload />
              </Button>
              <Button className={styles.detail__group__button}>
                <ShareLink link='https://your-site.com/some-page'>
                  {(link) => (
                    <a href={link} target='_blank' rel='noreferrer'>
                      <FaShare />
                    </a>
                  )}
                </ShareLink>
              </Button>
              <Button className={styles.detail__group__button}>
                <FaLink />
              </Button>
            </div>
            <div className={styles['detail__upload-by']}>
              <p className={styles['detail__upload-by__text']}>
                Tải lên bởi
                <Link href='/user-profile' passHref>
                  <a> {query.name} </a>
                </Link>
              </p>
            </div>
            <div className={styles.detail__author}>
              <div className={styles['detail__author--information']}>
                <Link href='/user-profile' passHref>
                  <img
                    className={styles['detail__author--avatar']}
                    src={query.avatar}
                  />
                </Link>

                <div className={styles['detail__author--des']}>
                  <Link href='/user-profile' passHref>
                    <h3 className={styles['detail__author--info']}>
                      {query.name}
                    </h3>
                  </Link>
                  <p className={styles['detail__author--info']}>
                    11,1k người theo dõi
                  </p>
                </div>
              </div>
              <div className={styles['detail__author--follow']}>
                <Button
                  onClick={handleFollow}
                  className={
                    buttonFollow
                      ? styles['detail__author__button-follow']
                      : styles['detail__author__button-followed']
                  }
                  style={{ backgroundColor: buttonFollow ? 'white' : 'red' }}
                >
                  {textFollow}
                </Button>
              </div>
            </div>
            <div className={styles['detail__show-more']}>
              <p className={styles['detail__show-more__des']}>Nhận xét</p>
              <Button className={styles['detail__show-more__des']}>
                <FaAngleDown />
              </Button>
              <div className='detail__comment' />
            </div>
            <div className={styles['detail__add-comment']}>
              <div className={styles['detail__add-comment__group-des']}>
                <img
                  className={styles['detail__add-comment__avatar']}
                  src={query.avatar}
                />
                <textarea
                  value={comment}
                  onChange={(e) => handleComment(e)}
                  type='text'
                  className={styles['detail__add-comment__input']}
                />
              </div>
              <div className={styles['detail__add-comment__buttons']}>
                <Button
                  onClick={cancelCommnent}
                  className={styles['detail__add-comment__button']}
                >
                  Huỷ
                </Button>
                <Button className={styles['detail__add-comment__button']}>
                  Đăng
                </Button>
              </div>
            </div>
          </div>
        </div>
        <p className={styles.related__text}>Các ghim khác tương tự</p>
        <ListPosts />
      </center>
    </>
  )
}

export default DetailPost
