import { get } from "adapters/xhr"
import ArchivePosts from "components/homepage/ArchivePosts"
import PageSelector from "components/homepage/PageSelector"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Select from "react-select"
import { apiUrl } from "utils/constants/env"

const CategoryPostsPage = ({ categoryId }) => {

    let params = useParams()


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
        const postsRes = await get(
            apiUrl +
            "/posts/category/"+params.categoryTitle+"/?page=" +
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
        <div className="home-wrapper">
            <div className="home">
                <h1>Posts in {params.categoryTitle}</h1>
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

export default CategoryPostsPage