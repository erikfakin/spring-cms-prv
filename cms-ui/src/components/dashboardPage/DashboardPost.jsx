import { Link } from "react-router-dom"
import styles from "./DashboardPost.module.scss"
import DeleteButton from "components/shared/buttons/DeleteButton"
import editIcon from "static/icons/edit.svg"

const DashboardPost = ({ post, onDelete }) => {
  return (
    <tr className={styles.dashboardPost}>
      <td className={styles.dashboardPost__id}>{post.id}</td>
      <td>
        <img
          className={styles.dashboardPost__image}
          src={
            post.featuredImage
              ? post.featuredImage.src
              : "/uploads/placeholder.jpg"
          }
          alt=""
        />
      </td>
      <td className={styles.dashboardPost__title}> {post.title}</td>
      <td className={styles.dashboardPost__edit}>
        <Link to={"/edit-post/" + post.id}>
          <img
            className={styles.dashboardPost__edit__icon}
            src={editIcon}
            alt="edit post"
          />
        </Link>{" "}
      </td>
      <td className={styles.dashboardPost__delete}>
        <DeleteButton onDelete={onDelete} url={"/posts/" + post.id} />
      </td>
    </tr>
  )
}

export default DashboardPost
