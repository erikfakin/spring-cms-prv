import CategoriesList from "components/dashboardPage/CategoriesList"
import styles from "./DashboardPage.module.scss"
import PostsList from "components/dashboardPage/PostsList"
import { useState } from "react"

const DashboardPage = () => {
  const [showPosts, setShowPosts] = useState(true)
  const [showCategories, setShowCategories] = useState(false)

  return (
    <div className={styles.dashboardPageWrapper}>
      <div className={styles.dashboardPage}>
        <div className={styles.dashboardPage__menu}>
          <button
            className={showPosts ? styles.dashboardPage__menu__active : ""}
            onClick={() => {
              setShowPosts(true)
              setShowCategories(false)
            }}
          >
            Posts
          </button>
          <button
            className={showCategories ? styles.dashboardPage__menu__active : ""}
            onClick={() => {
              setShowPosts(false)
              setShowCategories(true)
            }}
          >
            Categories
          </button>
        </div>
        <div className={styles.dashboardPage__edit}>
          {showPosts && <PostsList />}
          {showCategories && <CategoriesList />}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
