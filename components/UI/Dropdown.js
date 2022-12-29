import styles from './Dropdown.module.scss'

const Dropdown = (props) => {
  return (
    <div className={styles.dropdown}>{props.children}</div>
  )
}

export default Dropdown
