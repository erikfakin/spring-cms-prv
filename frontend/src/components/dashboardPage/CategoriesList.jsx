import { get, getProtected } from "adapters/xhr"
import { useEffect, useState } from "react"

import EditCategory from "components/shared/forms/EditCategory"
import DashboardCategory from "./DashboardCategory"
import SubmitButton from "components/shared/buttons/SubmitButton"
import styles from "./CategoriesList.module.scss"

const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [editCategory, setEditCategory] = useState()

  const getData = async () => {
    const res = await getProtected("/categories")
    setCategories(res.data)
  }

  useEffect(() => console.log(categories), [categories])

  const handleEditClick = (category) => {
    setEditCategory(category)
    setShowEditCategory(true)
  }

  const handleEditCloseClick = () => {
    setShowEditCategory(false)
    setEditCategory()
  }

  const handleDelete = () => {
    getData()
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="categoriesList">
      {showEditCategory && (
        <EditCategory
          category={editCategory}
          onSubmit={getData}
          onClose={handleEditCloseClick}
        />
      )}

      <SubmitButton onClick={() => setShowEditCategory(true)}>
        + add new category
      </SubmitButton>

      <table className={styles.categoriesList}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {categories?.map((category) => (
            <DashboardCategory
              category={category}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
              key={category.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesList
