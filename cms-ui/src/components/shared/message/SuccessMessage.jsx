import { useEffect } from "react"
import styles from "./SuccessMessage.module.scss"

const SuccessMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 5 seconds close message
      onClose()
    }, 500000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  return (
    <div className={styles.message}>
      {message}
      <div className={styles.message__close} onClick={onClose}>
        x
      </div>
    </div>
  )
}

export default SuccessMessage
