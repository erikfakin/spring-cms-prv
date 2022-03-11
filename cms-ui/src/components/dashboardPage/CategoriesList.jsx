import { get, getProtected } from "adapters/xhr"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import DashboardCategory from "./DashboardCategory"

const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [showEditCategory, setShowEditCategory] = useState(false)

  const getInitialData = async () => {
    setCategories(await getProtected(apiUrl + "/categories"))
  }
  useEffect(() => {
    getInitialData()
  }, [])
  return (
    <div className="categoriesList">
      <button>Add new category</button>
      {categories.map((category) => (
        <DashboardCategory category={category} setShowEditCategory={setShowEditCategory}/>
      ))}
    </div>
  )
}

export default CategoriesList
