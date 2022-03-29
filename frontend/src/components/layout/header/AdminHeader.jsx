import { useAuth } from "context/authContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./AdminHeader.module.scss"

const AdminHeader = () => {
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={styles.adminHeaderWrapper}>
      <div className={styles.adminHeader}>
        <div className={styles.adminHeader__navigation}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/edit-post">Create new post</Link>
        </div>
        <button
          className={styles.adminHeader__logout}
          onClick={() =>
            auth.signout(() => {
              navigate(location)
            })
          }
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminHeader
