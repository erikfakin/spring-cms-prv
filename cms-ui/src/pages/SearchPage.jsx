import { get } from "adapters/xhr";
import ArchivePost from "components/homepage/ArchivePost";
import PageSelector from "components/homepage/PageSelector";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiUrl } from "utils/constants/env";

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(searchParams.get("page") || 1)
    const [totalPosts, setTotalPosts] = useState(0)

    const query = searchParams.get("q")
    const perPage = searchParams.get("perPage") || 10

    const fetchPosts = async () => {
        const res = await get(
            apiUrl +
            "/posts/search?" +
            "q=" + query +
            "&page=" + page +
            "&perPage=" + perPage

        )
        console.log(res)
        setPosts(res.posts)
        setTotalPages(res.totalPages)
        setTotalPosts(res.totalPosts)
    }

    useEffect(() => {
        fetchPosts()
    }, [query, page])


    return <div>
        <h1>{`Results for: ${query}`}</h1>
        <p>Total results: {totalPosts}</p>
        <div className="searchPage__list">
            {posts.map(post => <ArchivePost key={post.id} post={post} />

            )}
        </div>
        <PageSelector
            setPage={setPage}
            totalPages={totalPages}
            currentPage={page}
        />
    </div>

}

export default SearchPage