import { Link } from "react-router-dom"
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
      </div>
    </Link>
  )
}

export default ArchivePost
