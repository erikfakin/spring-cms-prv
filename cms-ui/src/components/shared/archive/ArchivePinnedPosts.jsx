import { useEffect, useState } from "react";
import ArchivePosts from "./ArchivePosts";
import styles from './ArchivePinnedPosts.module.scss'
import { get } from "adapters/xhr";

const ArchivePinnedPosts = () => {

    const [error, setError] = useState()
    const [posts, setPosts] = useState([])

    const getData = async () => {
        const res = await get("/posts/pinned")
        if (!res.error) {
            setPosts(res.data)
        }

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.pinnedPosts}>
            <div className={styles.pinnedPosts__header}>
                <h1>Pinned posts</h1>
            </div>
            {error ? <p>{error}</p> : ""}
            <ArchivePosts posts={posts} />

        </div>
    );
}

export default ArchivePinnedPosts;