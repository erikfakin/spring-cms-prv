import SearchBar from "components/shared/inputs/SearchBar"
import { useAuth } from "context/authContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import AdminHeader from "./adminHeader/AdminHeader"

import styles from "./Header.module.scss"

const Header = () => {
  let navigate = useNavigate()
  let location = useLocation()
  const auth = useAuth()

  return (
    <div className={styles.headerWrapper}>
      {auth.isSignedIn ? <AdminHeader /> : ""}
      <div className={styles.header}>
        <Link to="/" className={styles.header__logo}>
          <h2 className={styles.header__logo}>SimpleCMS</h2>
        </Link>
        <div className={styles.header__desktop__search}>
          <SearchBar />
        </div>

        <div className={styles.header__navigation}>
          <Link className={styles.header__navigation__link} to="/">
            Home
          </Link>

          {auth.isSignedIn ? "" : <Link to="/login">Login</Link>}
        </div>
      </div>
      <div className={styles.headerMobile__search}>
        <SearchBar />
      </div>
    </div>
  )
}

export default Header
