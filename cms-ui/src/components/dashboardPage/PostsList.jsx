import { get } from "adapters/xhr"
import { useEffect, useState } from "react"
import Select from "react-select"
import { apiUrl } from "utils/constants/env"
import DashboardPost from "./DashboardPost"
import styles from "./PostsList.module.scss"

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [orderBy, setOrderBy] = useState("createdAt")
  const [order, setOrder] = useState("desc")
  const [perPage, setPerPage] = useState(100)

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

  const handleOrderingChange = (e) => {
    const selectedOrder = e.value
    setOrderBy(selectedOrder.split("-")[0])
    setOrder(selectedOrder.split("-")[1])
  }

  const getInitialData = async () => {
    const res = await get(apiUrl +
      "/posts/?page=" +
      page +
      "&orderBy=" +
      orderBy +
      "&order=" +
      order +
      "&perPage=" + perPage)

    setPosts(res.posts)
    setTotalPages(res.totalPages)
  }
  useEffect(() => {
    getInitialData()
  }, [order, orderBy, perPage, page])
  return (
    <>
      <div className="home__ordering">
        Order by:
        <Select
          options={orderOptions}
          defaultValue={orderOptions[0]}
          onChange={handleOrderingChange}
        />
      </div>
      <table className={styles.postsList}>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {console.log(posts)}
        {posts?.map((post) => (
          <DashboardPost post={post} />
        ))}
      </table>
    </>
  )
}

export default PostsList
