import { useEffect, useState } from "react"
import "./ImageInfo.scss"

const ImageInfo = ({ image }) => {
    const [title, setTitle] = useState("")
    const [alt, setAlt] = useState("")
    useEffect(() => {
        if (image) {
            setTitle(image.title || "")
            setAlt(image.alt || "")
        }

    }
        
        ,[image])

    console.log(image)
    return (
        <div className="image-info">

            <img className="image-info__image" src={image?.src} />
            <label className="image-info__title">
                Title
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label className="image-info__alt">
                Alt
                <input type="text" className="image-info__alt" value={alt} onChange={e => setAlt(e.target.value)} />
            </label>
        </div>
    )
}

export default ImageInfo