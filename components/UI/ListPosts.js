import React from 'react'
import styles from './ListPosts.module.scss'
import data from '../../constant/index'
import Button from './Button'
import { FaShare, FaDownload } from 'react-icons/fa'
import Link from 'next/link'

const ListPosts = () => {
  const handleClick = async () => {
    // Hàm xử lý nút download
    // const result = data.information.image
    // try {
    //   const image = await fetch(result, {
    //     mode: 'no-cors',
    //     headers: {
    //       'Access-Control-Allow-Origin': '*'
    //     }
    //   })
    //   const imageBlog = await image.blob()
    //   const imageURL = URL.createObjectURL(imageBlog)
    //   const link = document.createElement('a')
    //   link.href = imageURL
    //   link.download = `bookend2022.${result.split('.').pop() || 'png'}`
    //   console.log(link, 'linkkk')
    //   document.body.appendChild(link)
    //   link.click()
    //   document.body.removeChild(link)
    // } catch (err) {
    //   console.log(err)
    // }
    // FileSaver.saveAs(data.information.image, 'image.jpg');
  }

  return (
    <>
      <div className={styles['container__list-post']}>
        <center>
          <div className={styles.row}>
            {data.information.map((info) => (
              <div key={info.id}>
                <div className={styles.listboxes__posts__items}>
                  <div className={styles.listboxes__posts__container}>
                    <Button
                      type='button'
                      className={styles['listboxes__posts__btn--save']}
                    >
                      Save
                    </Button>
                    <Button
                      type='button'
                      className={styles['listboxes__posts__btn--share']}
                    >
                      <FaShare />
                    </Button>
                    <Button
                      onClick={handleClick}
                      type='button'
                      className={styles['listboxes__posts__btn--down']}
                    >
                      <FaDownload />
                    </Button>
                    <Link
                      passHref
                      legacyBehavior
                      href={{
                        pathname: `/detail-post/${info.id}`,
                        query: {
                          img: info.image,
                          name: info.name,
                          avatar: info.avatar
                        }
                      }}
                    >
                      <img
                        onClick={handleClick}
                        className={styles.listboxes__posts__img}
                        src={info.image}
                      />
                    </Link>
                  </div>
                  <h5 className='listboxes__posts__des'>{info.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </center>
      </div>
    </>
  )
}

export default ListPosts
