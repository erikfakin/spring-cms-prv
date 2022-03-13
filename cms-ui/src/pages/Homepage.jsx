import { useEffect, useState } from "react"
import ArchivePosts from "components/homepage/ArchivePosts"
import { apiUrl } from "utils/constants/env"
import { get } from "adapters/xhr"
import Select from "react-select"
import PageSelector from "components/homepage/PageSelector"
import PinnedPosts from "components/pinnedPosts/PinnedPosts"
import styles from "./Homepage.module.scss"

const Homepage = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [orderBy, setOrderBy] = useState("createdAt")
  const [order, setOrder] = useState("desc")
  const [pinnedPosts, setPinnedPosts] = useState([])

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
    const pinnedPostsRes = await get(apiUrl + "/posts/pinned")

    setPinnedPosts(pinnedPostsRes)
    console.log(pinnedPostsRes)

    const postsRes = await get(
      apiUrl +
        "/posts/?page=" +
        page +
        "&orderBy=" +
        orderBy +
        "&order=" +
        order
    )
    setPosts(postsRes.posts)
    setTotalPages(postsRes.totalPages)
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
    <div className={styles.homeWrapper}>
      <div className={styles.home}>
        <section className={styles.home__section}>
          <h1>Pinned Posts</h1>
          <PinnedPosts pinnedPosts={pinnedPosts} />
        </section>

        <section className={styles.home__section}>
          <div className={styles.home__section__header}>
            <h1>All Posts</h1>
            <div className={styles.home__ordering}>
              Order by:
              <Select
                options={orderOptions}
                defaultValue={orderOptions[0]}
                onChange={handleOrderingChange}
              />
            </div>
          </div>

          {error ? <p>{error}</p> : ""}

          <ArchivePosts posts={posts} />
          <PageSelector
            setPage={setPage}
            totalPages={totalPages}
            currentPage={page}
          />
        </section>
      </div>
    </div>
  )
}

export default Homepage
