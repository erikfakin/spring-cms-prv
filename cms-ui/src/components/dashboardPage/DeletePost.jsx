import { deleteItem, post } from "adapters/xhr"
import { useState } from "react"
import { apiUrl } from "utils/constants/env"

const DeletePost = ({ post }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDeletePost = () => {
    deleteItem(apiUrl + "/posts/" + post.id)
  }

  return (
    <div className="deletePost">
      {showConfirm ? (
        <div className="deletePost__confirm">
          <div className="deletePost__confirm__message"></div>
          <div className="deletePost__confirm__buttons">
            <button onClick={handleDeletePost}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      ) : (
        ""
      )}
      <button
        className="deletePost__button"
        onClick={() => setShowConfirm(true)}
      >
        Delete
      </button>
    </div>
  )
}

export default DeletePost
