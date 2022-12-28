import { ImCancelCircle } from 'react-icons/im'

import styles from './ModalConfirm.module.scss'
import Button from '../UI/Button'

const ModalConfirm = (props) => {
  const closeModalHandler = () => {
    props.setIsOpenModal(!props.isOpenModal)
  }

  const clickYesHandler = () => {
    props.setIsYes(true)
    props.setIsOpenModal(!props.isOpenModal)
  }

  return (
    <div className={styles.modal} onClick={closeModalHandler}>
      <div className={styles.modal__container} onClick={(e) => e.stopPropagation()}>
        <ImCancelCircle className={styles.modal__icon} />
        <p className={styles.modal__title}>{props.title}</p>
        <div className={styles.modal__btn}>
          <Button className={styles['modal__btn--no']} onClick={closeModalHandler}>Không</Button>
          <Button className={styles['modal__btn--yes']} onClick={clickYesHandler}>Có</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm
