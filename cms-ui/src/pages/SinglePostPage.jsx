import { get } from "adapters/xhr"
import Post from "components/singlePostPage/Post"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiUrl } from "utils/constants/env"

function SinglePostPage() {
  let params = useParams()

  const [post, setPost] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setPost(await get(apiUrl + "/posts/" + params.postId))
    }
    fetchData().catch((e) => setError(e.message))
  }, [params])
  return (
    <div className="single-post">
      {error ? <p>{error}</p> : ""}
      {post ? <Post post={post} /> : ""}
    </div>
  )
}

export default SinglePostPage
