import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <div className="menu">
      <Link to="/dashboard/posts">Posts</Link>
      <Link to="/dashboard/posts">Categories</Link>
      <Link to="/dashboard/posts">Media</Link>
    </div>
  )
}

export default Menu
