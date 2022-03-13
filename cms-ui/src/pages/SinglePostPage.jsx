import { get } from "adapters/xhr"
import Post from "components/singlePostPage/Post"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiUrl } from "utils/constants/env"
import styles from "./SinglePostPage.module.scss"

function SinglePostPage() {
  let params = useParams()

  const [post, setPost] = useState()
  const [error, setError] = useState()

  const fetchData = async () => {
    setPost(await get(apiUrl + "/posts/" + params.postId))
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
