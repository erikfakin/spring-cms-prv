import { get, post, update } from "adapters/xhr"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"

const EditCategory = ({ category, onEditCloseClick, onSubmit }) => {
  console.log(category)
  const [title, setTitle] = useState(category?.title || "")
  const [description, setDescription] = useState(category?.description || "")
  const buttonText = category ? "Update" : "Create"

  const handleSubmit = async () => {
    if (category) {
      const res = await update(apiUrl + "/categories/" + category.id, {
        title,
        description,
      })

      if (res.ok) {
        onSubmit()
      }
    } else {
      const res = await post(apiUrl + "/categories", {
        title,
        description,
      })
      if (res.ok) {
        onSubmit()
      }
    }
  }

  return (
    <div className="categoryForm">
      <button onClick={onEditCloseClick}>x</button>
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>{buttonText}</button>
    </div>
  )
}

export default EditCategory
