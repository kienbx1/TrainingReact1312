import { useState, useEffect } from 'react'
import { AiOutlineCloudUpload, AiFillDelete } from 'react-icons/ai'
import Button from '../components/UI/Button'
import ModalConfirm from '../components/UI/ModalConfirm'
import classNames from 'classnames'

import classes from './create-post.module.scss'

const CreatePost = () => {
  const [titlePost, setTitlePost] = useState('')
  const [imagePost, setImagePost] = useState()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isYes, setIsYes] = useState(false)

  useEffect(() => {
    return () => {
      imagePost && URL.revokeObjectURL(imagePost.preview)
    }
  }, [imagePost])

  const uploadImageHandler = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setImagePost(file)
  }

  const deleteImageHandler = () => {
    setImagePost()
  }

  const enterTitlePostHandler = (e) => {
    setTitlePost(e.target.value)
  }

  const cancelHandler = () => {
    setIsOpenModal(true)
  }

  const postHandler = () => {
    setImagePost()
    setTitlePost('')
  }

  if (isYes) {
    setImagePost()
    setTitlePost('')
    setIsYes(false)
  }

  return (
    <div className={classes['create-post__container']}>
      <div className={classes['create-post__wrapper']}>
        {
          !imagePost
            ? (
              <div className={classes['create-post__image']}>
                <AiOutlineCloudUpload className={classes['create-post__image--icon']} />
                <p className={classes['create-post__image--title']}>Kéo và thả hoặc nhấp vào để tải ảnh</p>
                <input accept='image/*' className={classes['create-post__image--input']} type='file' onChange={uploadImageHandler} />
              </div>
              )
            : (
              <div className={classes['create-post__preview']}>
                <img src={imagePost.preview} alt='' className={classes['preview-image']} />
                <AiFillDelete className={classes['delete-preview']} onClick={deleteImageHandler} />
              </div>
              )
        }
        <div className={classes['create-post__content']}>
          <div className={classes.content__user}>
            <img src='/images/avatar_test.png' className={classes['content__user--avatar']} alt='avatar user' />
            <p className={classes['content__user--name']}>Trần Phúc Thịnh</p>
          </div>
          <input type='text' className={classes.content__title} value={titlePost} onChange={enterTitlePostHandler} placeholder='Tạo tiêu đề' />
          <div className={classes['content__group-btn']}>
            {imagePost && <Button className={classNames(classes.content__btn, classes.cancel)} onClick={cancelHandler}>Hủy</Button>}
            <Button className={classNames(classes.content__btn, classes.post)} onClick={postHandler}>Đăng</Button>
          </div>
          {
            isOpenModal &&
              <ModalConfirm isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} setIsYes={setIsYes} />
          }
        </div>
      </div>
    </div>
  )
}

export default CreatePost
