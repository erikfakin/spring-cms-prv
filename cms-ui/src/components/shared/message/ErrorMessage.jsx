const ErrorMessage = ({ message, onClose }) => {
    useEffect(() => {
      const timeId = setTimeout(() => {
        // After 5 seconds close message
        onClose()
      }, 5000)
  
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
 
export default ErrorMessage;