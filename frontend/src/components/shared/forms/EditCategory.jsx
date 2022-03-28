import { post, update } from "adapters/xhr"
import { useState } from "react"

import SubmitButton from "components/shared/buttons/SubmitButton"
import TextInput from "../inputs/TextInput"
import styles from "./EditCategory.module.scss"

const EditCategory = ({ onSubmit, onClose, category }) => {
  const [description, setDescription] = useState(category?.description || "")
  const [title, setTitle] = useState(category?.title || "")


  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if (category) {
      const res = await update("/categories/" + category.id, {
        title,
        description,
      })

      console.log(res)

      if (!res.error) {
        onClose()
        onSubmit(res.data)
      }
    } else {
      const res = await post("/categories", {
        title,
        description,
      })

      console.log(res)

      if (!res.error) {
        onClose()
        onSubmit(res.data)
      }
    }
  }

  return (
    <div className={styles.editCategoryWrapper}>
      <div className={styles.editCategory}>
        <button className={styles.editCategory__close} onClick={onClose}>
          x
        </button>

        <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} autofocus={true} onKeyDown={handleOnKeyDown} />
        <TextInput label="Description" value={description} onChange={(e) => setDescription(e.target.value)} onKeyDown={handleOnKeyDown} />
        <SubmitButton onClick={handleSubmit}>Create</SubmitButton>
      </div>
    </div>
  )
}

export default EditCategory
