import ArchiveCategoryPosts from "components/shared/archive/ArchiveCategoryPosts"
import { useParams } from "react-router-dom"


const CategoryPostsPage = () => {

    let params = useParams()
    
    return (
        <div className="categoryPostsPage">
            <ArchiveCategoryPosts categoryTitle={params.categoryTitle} />
        </div>
    )
}

export default CategoryPostsPage