import { Link, useNavigate } from "react-router-dom"
import { formatDate } from "utils/helpers/date"
import "./ArchivePost.css"

function ArchivePost({ post }) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate("/posts/" + post.id)} className="archivePost">
      <img
        className="archivePost__image"
        src={
          post?.featuredImage?.src
            .substring(post.featuredImage.src.indexOf("uploads") - 1)
            .replace(/\\/, "/") || "/uploads/placeholder.jpg"
        }
        alt={post?.featuredImage?.alt || "placeholder image"}
      />

      <div className="archivePost__info">
        <h3 className="archivePost__info__title">{post.title}</h3>
        <Link to={"/category/" + post.category.title}>
          {post.category.title}
        </Link>
        <p>{formatDate(post.updatedAt)}</p>
        <p
          style={{ marginTop: "2rem" }}
          className="archivePost__info__description"
        >
          {post.description}
        </p>
      </div>
    </div>
  )
}

export default ArchivePost
