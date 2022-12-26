import React from 'react'
import Image from 'next/image'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styles from './ListPosts.module.scss'
import classNames from 'classnames'
import { images } from '../../constant'
import Button from './Button'




const ListPosts = () => {


const handleOnclick=() => {
  console.log("hehehehehe")
}


  return (
    <div>
      <div className='container'>
        <center>
        <div className={classNames(styles.row,'justify-content-center')}>
          <div className={classNames(styles.listposts__posts)}>
            <div className={classNames(styles.listposts__posts__items)}>
              <Button onClick={handleOnclick} type='button' className={styles.listposts__posts__btn}  >Save</Button>
              <Image onClick={handleOnclick} className={classNames(styles.listposts__posts__img)}   src={images.avatar} />
              <h5 >Cài đặt phần mềm định vị oto</h5>
            </div>
          </div>
          <div className={classNames(styles.listposts__posts,'col-lg-2','col-md-4')}>
            <div className={classNames(styles.listposts__posts__items)}>
            <Button onClick={handleOnclick} type='button' className={styles.listposts__posts__btn}>Save</Button>
            <Image  className={classNames(styles.listposts__posts__img)} src={images.avatar6} />
              <h5 >Cài đặt phần mềm định vị oto</h5>
            </div>
          </div>
          <div className={classNames(styles.listposts__posts,'col-lg-2','col-md-4')}>
           <div className={classNames(styles.listposts__posts__items)}>
             <Image   className={classNames(styles.listposts__posts__img)} src={images.avatar2} />
             <h5 >Cài đặt phần mềm định vị oto</h5>
           </div>
          </div>
          <div className={classNames(styles.listposts__posts, 'col-lg-2','col-md-4')}>
            <div className={classNames(styles.listposts__posts__items)}> 
             <Image className={classNames(styles.listposts__posts__img)} src={images.avatar3} />
             <h5 >Cài đặt phần mềm định vị oto</h5>
           </div>
          </div>
          <div className={classNames(styles.listposts__posts, 'col-lg-2','col-md-4')}>
            <div className={classNames(styles.listposts__posts__items)}>
             <Image className={classNames(styles.listposts__posts__img)} src={images.avatar5} />
             <h5 >Cài đặt phần mềm định vị oto</h5>
            </div>
          </div>
          <div className={classNames(styles.listposts__posts, 'col-lg-2','col-md-4')}>
            <div className={classNames(styles.listposts__posts__items)}>
             <Image className={classNames(styles.listposts__posts__img)} src={images.avatar3} />
             <h5 >Cài đặt phần mềm định vị oto</h5>
            </div>
          </div>
          <div className={classNames(styles.listposts__posts , 'col-lg-2','col-md-4')}>
            <div className={classNames(styles.listposts__posts__items)}>
             <Image className={classNames(styles.listposts__posts__img)} src={images.avatar2} />
             <h5 >Cài đặt phần mềm định vị oto</h5>
            </div>
          </div>
          <div className={classNames(styles.listposts__posts , 'col-lg-2','col-md-4')}>
            <div className={classNames(styles.listposts__posts__items)}>
             <Image className={classNames(styles.listposts__posts__img)} src={images.avatar8} />
             <h5 >Cài đặt phần mềm định vị oto</h5></div>
          </div>
          <div className={classNames(styles.listposts__posts, 'col-lg-2','col-md-4')}>
            <div className={classNames(styles.listposts__posts__items)}>
             <Image className={classNames(styles.listposts__posts__img)} src={images.avatar6} />
             <h5 >Cài đặt phần mềm định vị oto</h5>
            </div>
          </div>
          <div className={classNames(styles.listposts__posts, 'col-lg-2','col-md-4')}>
            <div className={classNames(styles.listposts__posts__items)}>
             <Image className={classNames(styles.listposts__posts__img)} src={images.avatar7} />
             <h5 >Cài đặt phần mềm định vị oto</h5>
            </div>
          </div>
          <div className={classNames(styles.listposts__posts, 'col-lg-2','col-md-4')}>
            <div className={classNames(styles.listposts__posts__items)}>
             <Image className={classNames(styles.listposts__posts__img)} src={images.avatar9} />
             <h5 >Cài đặt phần mềm định vị oto</h5>
            </div>
          </div>
        </div>
       </center>
      </div>
    </div>
  )
}

export default ListPosts
