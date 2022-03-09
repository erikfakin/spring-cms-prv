import { deleteItem } from "adapters/xhr"
import { useState } from "react"
import { apiUrl } from "utils/constants/env"

const DeleteCategory = ({ category }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDeleteCategory = () => {
    deleteItem(apiUrl + "/categorys/" + category.id)
  }

  return (
    <div className="deleteCategory">
      {showConfirm ? (
        <div className="deleteCategory__confirm">
          <div className="deleteCategory__confirm__message"></div>
          <div className="deleteCategory__confirm__buttons">
            <button onClick={handleDeleteCategory}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      ) : (
        ""
      )}
      <button
        className="deleteCategory__button"
        onClick={() => setShowConfirm(true)}
      >
        Delete
      </button>
    </div>
  )
}

export default DeleteCategory
