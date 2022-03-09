import { Link } from "react-router-dom"
import DeleteCategory from "./DeleteCategory"

const DashboardCategory = ({ category }) => {
  return (
    <div className="dashboardPost">
      <div className="dashboardPost__title"> {category.title}</div>
      <Link to={"/edit-category/" + category.id}>Edit</Link>
      <DeleteCategory category={category} />
    </div>
  )
}

export default DashboardCategory
