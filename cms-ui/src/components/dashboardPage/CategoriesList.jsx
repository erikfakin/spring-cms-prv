import { get, getProtected } from "adapters/xhr"
import EditCategory from "components/editCategory/EditCategory"
import { useEffect, useState } from "react"

import DashboardCategory from "./DashboardCategory"
import styles from "./CategoriesList.module.scss"
import SubmitButton from "components/shared/buttons/SubmitButton"
import CreateCategory from "components/shared/forms/CreateCategory"

const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [editCategory, setEditCategory] = useState()

  const getData = async () => {
    setCategories(await getProtected("/categories"))
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

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="categoriesList">
      {showEditCategory &&
        <CreateCategory
          category={editCategory}
          onSubmit={getData}
          onClose={handleEditCloseClick}
        />
      }

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
          />
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesList
