import { get } from "adapters/xhr"
import Post from "components/singlePostPage/Post"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./SinglePostPage.module.scss"

function SinglePostPage() {
  let params = useParams()

  const [post, setPost] = useState()
  const [error, setError] = useState()

  const fetchData = async () => {
    const res = await get("/posts/" + params.postId)
    setPost(res.data)
  }
  useEffect(() => {
    fetchData()
  }, [params])
  return (
    <div className={styles.singlePost}>
      {error ? <p>{error}</p> : ""}
      {post ? <Post post={post} /> : ""}
    </div>
  )
}

export default SinglePostPage
