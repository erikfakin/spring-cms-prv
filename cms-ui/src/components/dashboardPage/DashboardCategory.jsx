import EditCategory from "components/editCategory/EditCategory"
import { useState } from "react"
import { Link } from "react-router-dom"
import DeleteCategory from "./DeleteCategory"

const DashboardCategory = ({ category, onEditClick }) => {
  
  return (
    <div className="dashboardPost">

      
      <div className="dashboardPost__title"> {category.title}</div>
      <div className="dashboardPost__title"> {category.description}</div>
      <button onClick={() => onEditClick(category)}>Edit</button>
      <DeleteCategory category={category} />
    </div>
  )
}

export default DashboardCategory
