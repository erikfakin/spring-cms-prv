import { deleteItem } from "adapters/xhr"
import { useState } from "react"
import styles from "./DeleteButton.module.scss"
import deleteIcon from "static/icons/delete.svg"

const DeleteButton = ({ url, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    const res = await deleteItem(url)
    if (res.ok) onDelete()
  }

  return (
    <div className={styles.deleteButton}>
      {showConfirm ?
        (<div className={styles.deleteButton__confirm}>
          <div className={styles.deleteButton__confirm__message}>
            Are you sure?
          </div>
          <div className={styles.deleteButton__confirm__buttons}>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>) :
        (<button
          className={styles.deleteButton__button}
          onClick={() => setShowConfirm(true)}
        >
          <img
            className={styles.deleteButton__icon}
            src={deleteIcon}
            alt="delete"
          />
        </button>)
      }

    </div>
  )
}

export default DeleteButton
