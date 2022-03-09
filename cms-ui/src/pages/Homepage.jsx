import { useEffect, useState } from "react"
import ArchivePosts from "components/homepage/ArchivePosts"
import { apiUrl } from "utils/constants/env"
import { get } from "adapters/xhr"
import Select from "react-select"
import PageSelector from "components/homepage/PageSelector"

const Homepage = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [orderBy, setOrderBy] = useState("createdAt")
  const [order, setOrder] = useState("desc")

  const orderOptions = [
    {
      value: "createdAt-desc",
      label: "Newest to oldest",
    },
    {
      value: "createdAt-asc",
      label: "Oldest to newest",
    },
    {
      value: "title-asc",
      label: "Title A -> Z",
    },
    {
      value: "title-desc",
      label: "Title Z -> A",
    },
  ]

  const fetchPosts = async () => {
    const res = await get(
      apiUrl +
        "/posts/?page=" +
        page +
        "&orderBy=" +
        orderBy +
        "&order=" +
        order
    )
    console.log(res)
    setPosts(res.posts)
    setTotalPages(res.totalPages)
  }

  const handleOrderingChange = (e) => {
    const selectedOrder = e.value
    setOrderBy(selectedOrder.split("-")[0])
    setOrder(selectedOrder.split("-")[1])
  }

  useEffect(() => {
    fetchPosts()
    console.log(page, order, orderBy, posts)
  }, [page, order, orderBy])

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="home-wrapper">
      <div className="home">
        <h1>Latest Posts</h1>
        {error ? <p>{error}</p> : ""}
        <div className="home__ordering">
          Order by:
          <Select
            options={orderOptions}
            defaultValue={orderOptions[0]}
            onChange={handleOrderingChange}
          />
        </div>

        <ArchivePosts posts={posts} />
        <PageSelector
          setPage={setPage}
          totalPages={totalPages}
          currentPage={page}
        />
      </div>
    </div>
  )
}

export default Homepage
