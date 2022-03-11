import { get, post, update } from "adapters/xhr"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"

const EditCategory = ({category, setShowEditCategory}) => {
    const [title, setTitle] = useState(category?.title)
    const [description, setDescription] = useState(category?.description)
    const buttonText = category? "Update" : "Create"

    

    const handleSubmit = () => {
        if (category) {
            update(apiUrl + "/categories/" + category.id, {
                title,
                description
            })
        } else {
            post(apiUrl+"/categories", {
                title,
                description
            })
        }
    }

    return (
        <div className="categoryForm">
            <button onClick={() => setShowEditCategory(false)}>x</button>
            <input name="title" value={title} onChange={e => setTitle(e.target.value)}/>
            <input name="description" value={description} onChange={e => setDescription(e.target.value)}/>
            <button onClick={handleSubmit}>{buttonText}</button>
        </div>
    )
}

export default EditCategory