import { useAuth } from "context/authContext"
import { Link } from "react-router-dom"
import { formatDate } from "utils/helpers/date"
import styles from "./Post.module.scss"

const Post = ({ post }) => {
  const auth = useAuth()
  return (
    <>
      {auth.isSignedIn ? (
        <Link to={"/edit-post/" + post.id}>Edit post</Link>
      ) : (
        ""
      )}
      <h1 className={styles.singlePost__title}>{post.title}</h1>
      <p className={styles.singlePost__description}>{post.description}</p>

      {post.featuredImage ? (
        <img
          className={styles.singlePost__featuredImage}
          src={post.featuredImage.src}
          alt={post.featuredImage.alt}
        />
      ) : (
        <img
          className={styles.singlePost__featuredImage}
          src="/uploads/placeholder.jpg"
          alt=""
        />
      )}

      <div className={styles.singlePost__info}>
        <Link
          to={"/category/" + post.category.title}
          className={styles.singlePost__info__category}
        >
          Posted in {post.category.title}
        </Link>
        <p className={styles.singlePost__info__updatedAt}>
          on {formatDate(post.updatedAt)}
        </p>
      </div>

      <div
        className={styles.singlePost__content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </>
  )
}

export default Post
