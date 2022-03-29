import { get } from "adapters/xhr"
import SubmitButton from "components/shared/buttons/SubmitButton"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import DashboardPost from "./DashboardPost"
import styles from "./PostsList.module.scss"

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [orderBy, setOrderBy] = useState("createdAt")
  const [order, setOrder] = useState("desc")
  const [perPage, setPerPage] = useState(100)

  const navigate = useNavigate()

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

  const handleDelete = () => {
    getData()
  }

  const handleOrderingChange = (e) => {
    const selectedOrder = e.value
    setOrderBy(selectedOrder.split("-")[0])
    setOrder(selectedOrder.split("-")[1])
  }

  const getData = async () => {
    const res = await get(
      "/posts/?page=" +
        page +
        "&orderBy=" +
        orderBy +
        "&order=" +
        order +
        "&perPage=" +
        perPage
    )

    setPosts(res.data.posts)
    setTotalPages(res.data.totalPages)
  }
  useEffect(() => {
    getData()
  }, [order, orderBy, perPage, page])
  return (
    <>
      <div className={styles.postsList__header}>
        <SubmitButton onClick={() => navigate("/edit-post")}>
          + create new post
        </SubmitButton>

        <div className={styles.postsList__header__sorting}>
          Order by:
          <Select
            options={orderOptions}
            defaultValue={orderOptions[0]}
            onChange={handleOrderingChange}
          />
        </div>
      </div>
      <table className={styles.postsList__table}>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {console.log(posts)}
        {posts?.map((post) => (
          <DashboardPost key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </table>
    </>
  )
}

export default PostsList
