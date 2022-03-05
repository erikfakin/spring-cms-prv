import { Link } from "react-router-dom"
import "./ArchivePost.css"

function ArchivePost({ post }) {
  return (
    <Link to={"/posts/" + post.id} className="archivePost">
      {post.featuredImage ? (
        <img
        className="archivePost__image"
          src={post.featuredImage.src
            .substring(post.featuredImage.src.indexOf("uploads") - 1)
            .replace(/\\/, "/")}
          alt=""
        />
      ) : (
        <img
          className="archivePost__image"
          src="/uploads/placeholder.jpg"
          alt="placeholder"
        />
      )}

      <div className="archivePost__info">
        <h2 className="archivePost__info__title">{post.title}</h2>
        <p className="archivePost__info__description">{post.description}</p>
      </div>
    </Link>
  )
}

export default ArchivePost
