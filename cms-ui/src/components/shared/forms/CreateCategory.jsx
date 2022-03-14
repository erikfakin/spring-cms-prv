import { post, update } from "adapters/xhr"
import SubmitButton from "components/shared/buttons/SubmitButton"
import { useState } from "react"
import styles from "./CreateCategory.module.scss"

const CreateCategory = ({ onSubmit, onClose, category }) => {
  const [title, setTitle] = useState(category?.title || "")
  const [description, setDescription] = useState(category?.description || "")

  const handleSubmit = async () => {
    if (category) {
      const res = await update("/categories/" + category.id, {
        title,
        description,
      })

      if (res.data.ok) {
        onClose()
        onSubmit(await res.data.json())
      }
    } else {
      const res = await post("/categories", {
        title,
        description,
      })

      if (res.data.ok) {
        onClose()
        onSubmit(await res.data.json())
      }
    }
  }

  return (
    <div className={styles.createCategoryWrapper}>
      <div className={styles.createCategory}>
        <button className={styles.createCategory__close} onClick={onClose}>
          x
        </button>
        <label className={styles.createCategory__title}>
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={styles.createCategory__description}>
          Description
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <SubmitButton onClick={handleSubmit}>Create</SubmitButton>
      </div>
    </div>
  )
}

export default CreateCategory
