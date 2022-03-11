import { get, getProtected } from "adapters/xhr"
import EditCategory from "components/editCategory/EditCategory"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import DashboardCategory from "./DashboardCategory"

const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [editCategory, setEditCategory] = useState()

  const getData = async () => {
    setCategories(await getProtected(apiUrl + "/categories"))
  }


  useEffect(() => console.log(categories),[categories])

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
      {showEditCategory? <EditCategory category={editCategory} onEditCloseClick={handleEditCloseClick} onSubmit={getData}/>: ""}
      <button onClick={() => setShowEditCategory(true)}>Add new category</button>
      {categories.map((category) => (
        <DashboardCategory category={category} onEditClick={handleEditClick} />
      ))}
    </div>
  )
}

export default CategoriesList
