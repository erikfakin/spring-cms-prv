import ArchivePost from "components/homepage/ArchivePost"

const PinnedPosts = ({ pinnedPosts }) => {
    console.log(pinnedPosts)
    return <div>
          {pinnedPosts.map((post) => (
        <ArchivePost key={post.id} post={post} />
      ))}

    </div>
}

export default PinnedPosts