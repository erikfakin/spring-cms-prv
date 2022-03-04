import ArchivePost from "./ArchivePost"
import "./ArchivePosts.css"

const ArchivePosts = ({ posts }) => {
  return (
    <div className="posts-archive">
      {posts.map((post) => (
        <ArchivePost key={post.id} post={post} />
      ))}
    </div>
  )
}

export default ArchivePosts
