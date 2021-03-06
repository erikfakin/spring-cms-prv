import { Link, useNavigate } from "react-router-dom"
import { formatDate } from "utils/helpers/date"
import styles from "./ArchivePost.module.scss"

function ArchivePost({ post }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate("/posts/" + post.id)}
      className={styles.archivePost}
    >
      {post.featuredImage ? (
        <img
          className={styles.archivePost__image}
          src={post.featuredImage.src}
          alt={post.featuredImage.alt || "Post image"}
        />
      ) : (
        <img
          className={styles.archivePost__image}
          src="/uploads/placeholder.jpg"
          alt="placeholder"
        />
      )}

      <div className={styles.archivePost__info}>
        <h3 className={styles.archivePost__info__title}>{post.title}</h3>
        <a
          href={"/category/" + post.category.title}
          onClick={(e) => {
            e.preventDefault()
            navigate("/category/" + post.category.title)
            e.stopPropagation()
          }}
        >
          {post.category.title}
        </a>
        <p>{formatDate(post.updatedAt)}</p>
        <p className={styles.archivePost__info__description}>
          {post.description}
        </p>
      </div>
    </div>
  )
}

export default ArchivePost
