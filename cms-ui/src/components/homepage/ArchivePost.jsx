import { Link } from "react-router-dom"
import { formatDate } from "utils/helpers/date"
import "./ArchivePost.css"

function ArchivePost({ post }) {
  return (
    <Link to={"/posts/" + post.id} className="archivePost">
        <img
        className="archivePost__image"
          src={post?.featuredImage?.src
            .substring(post.featuredImage.src.indexOf("uploads") - 1)
            .replace(/\\/, "/") || "/uploads/placeholder.jpg"}
          alt={post?.featuredImage?.alt || "placeholder image"}
        />
      

      <div className="archivePost__info">
        <h2 className="archivePost__info__title">{post.title}</h2>
        <p className="archivePost__info__description">{post.description}</p>
        <p>{formatDate(post.updatedAt)}</p>
        <Link to={"/category/"+post.category.title}>{post.category.title}</Link>
      </div>
    </Link>
  )
}

export default ArchivePost
