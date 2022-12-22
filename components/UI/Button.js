import classNames from 'classnames'
import styles from './Button.module.scss'

const Button = (props) => {
  return (
    <button type={props.type} className={classNames(styles.button, props.className)}>
      {props.children}
    </button>
  )
}

export default Button
