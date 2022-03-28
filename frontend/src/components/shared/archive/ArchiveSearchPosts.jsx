import { get } from "adapters/xhr";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArchivePosts from "./ArchivePosts";
import styles from './ArchiveSearchPosts.module.scss'
import PageSelector from "./PageSelector";

const ArchiveSearchPosts = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(searchParams.get("page") || 1)
    const [totalPosts, setTotalPosts] = useState(0)
    const [error, setError] = useState()

    const query = searchParams.get("q")




    const getData = async () => {
        const res = await get(
            "/posts/search?" +
            "q=" + query +
            "&page=" + page
        )

        if (!res.error) {
            setPosts(res.data.posts)
            setTotalPages(res.data.totalPages)
            setTotalPosts(res.data.totalPosts)
        }
    }


    useEffect(() => {
        getData()
    }, [page, query])


    return (
        <div className={styles.archiveAllPosts}>
            <div className={styles.archiveAllPosts__header}>
                <h1>{`Results for: ${query}`}</h1>
                <p>Total results: {totalPosts}</p>

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

export default ArchiveSearchPosts;