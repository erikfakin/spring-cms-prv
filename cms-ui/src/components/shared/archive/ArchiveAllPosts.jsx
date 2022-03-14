import { get } from "adapters/xhr";
import { useEffect, useState } from "react";
import Select from "react-select";
import ArchivePosts from "./ArchivePosts";
import PageSelector from "./PageSelector";
import styles from './ArchiveAllPosts.module.scss'

const ArchiveAllPosts = () => {

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

    const getData = async () => {

        const res = await get(
            "/posts/?page=" +
            page +
            "&orderBy=" +
            orderBy +
            "&order=" +
            order
        )

        if (!res.error) {
            setPosts(res.data.posts)
            setTotalPages(res.data.totalPages)
        }
    }

    const handleOrderingChange = (e) => {
        const selectedOrder = e.value
        setOrderBy(selectedOrder.split("-")[0])
        setOrder(selectedOrder.split("-")[1])
    }

    useEffect(() => {
        getData()
    }, [page, order, orderBy])

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className={styles.archiveAllPosts}>
            <div className={styles.archiveAllPosts__header}>
                <h1>All Posts</h1>
                <div className={styles.archiveAllPosts__ordering}>
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
        </div>)
}

export default ArchiveAllPosts;