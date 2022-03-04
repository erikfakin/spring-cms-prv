import { formatDate } from "utils/helpers/date"
import "./Post.css"

const Post = ({ post }) => {
  return (
    <>
      <h1 className="single-post__title">{post.title}</h1>
      <p className="singlee-post__description">{post.description}</p>
      {post.featuredImage ? (
        <img
          className="single-post__featured-image"
          src={post.featuredImage.src
            .substring(post.featuredImage.src.indexOf("uploads") - 1)
            .replace(/\\/, "/")}
          alt=""
        />
      ) : (
        <img
          className="single-post__featured-image"
          src="/uploads/placeholder.jpg"
          alt=""
        />
      )}

      <div className="single-post__info">
        <h4 className="single-post__info__posted-by">
          Posted by: {post.author}
        </h4>
        <p className="single-post__info__updated-at">
          {formatDate(post.updatedAt)}
        </p>
      </div>

      <div
        className="single-post__content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </>
  )
}

export default Post
