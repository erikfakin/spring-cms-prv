import { get, getProtected } from "adapters/xhr"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import DashboardCategory from "./DashboardCategory"

const CategoriesList = () => {
  const [categories, setCategories] = useState([])

  const getInitialData = async () => {
    setCategories(await getProtected(apiUrl + "/categories"))
  }
  useEffect(() => {
    getInitialData()
  }, [])
  return (
    <div className="categoriesList">
      {categories.map((category) => (
        <DashboardCategory category={category} />
      ))}
    </div>
  )
}

export default CategoriesList
