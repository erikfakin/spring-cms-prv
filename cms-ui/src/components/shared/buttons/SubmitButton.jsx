import styles from "./SubmitButton.module.scss"

const SubmitButton = ({ children, onClick }) => {
  return (
    <button className={styles.submitButton} onClick={onClick}>
      {children}
    </button>
  )
}

export default SubmitButton
