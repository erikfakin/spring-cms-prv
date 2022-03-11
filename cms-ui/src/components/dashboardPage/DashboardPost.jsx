import { Link } from "react-router-dom"
import DeletePost from "./DeletePost"
import styles from "./DashboardPost.module.scss"

const DashboardPost = ({ post }) => {
  return (
    <tr className={styles.dashboardPost}>
      <td>{post.id}</td>
      <td>
        <img
          className={styles.dashboardPost__image}
          src={post.image ? post.image.url : "/uploads/placeholder.jpg"}
          alt=""
        />
      </td>
      <td className={styles.dashboardPost__title}> {post.title}</td>
      <td>
        <Link to={"/edit-post/" + post.id}>Edit</Link>{" "}
      </td>
      <td>
        <DeletePost post={post} />
      </td>
    </tr>
  )
}

export default DashboardPost
