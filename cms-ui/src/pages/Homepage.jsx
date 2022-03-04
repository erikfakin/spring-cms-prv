import { useEffect, useState } from "react"
import ArchivePosts from "components/homepage/ArchivePosts"
import { apiUrl } from "utils/constants/env"
import { get } from "adapters/xhr"

const Homepage = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setPosts(await get(apiUrl + "/posts"))
    }
    fetchData().catch((e) => setError(e.message))
  }, [])

  return (
    <div className="home-wrapper">
      <div className="home">
        <h1>Latest Posts</h1>
        {error ? <p>{error}</p> : ""}
        <ArchivePosts posts={posts} />
      </div>
    </div>
  )
}

export default Homepage
