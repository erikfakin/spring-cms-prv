import ArchivePost from "./ArchivePost"
import styles from './ArchivePosts.module.scss'


const ArchivePosts = ({ posts }) => {
  return (
    <div className={styles.archivePosts}>
      {posts.map((post) => (
        <ArchivePost key={post.id} post={post} />
      ))}
    </div>
  )
}

export default ArchivePosts
