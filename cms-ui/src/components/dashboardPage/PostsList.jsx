import { get } from "adapters/xhr"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import DashboardPost from "./DashboardPost"
import styles from "./PostsList.module.scss"

const PostsList = () => {
  const [posts, setPosts] = useState([])

  const getInitialData = async () => {
    setPosts(await get(apiUrl + "/posts"))
  }
  useEffect(() => {
    getInitialData()
  }, [])
  return (
    <table className={styles.postsList}>
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      {console.log(posts)}
      {posts?.map((post) => (
        <DashboardPost post={post} />
      ))}
    </table>
  )
}

export default PostsList
