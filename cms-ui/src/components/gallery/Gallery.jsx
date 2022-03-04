import { get, upload } from "adapters/xhr"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import Image from "./Image"

import "./Gallery.css"

const Gallery = ({ setFeaturedImage }) => {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState()
  const [imageToUpload, setImageToUpload] = useState()
  useEffect(() => {
    const getData = async () => {
      setImages(await get(apiUrl + "/images"))
    }
    getData()
  }, [])

  const handleSelectImage = (e) => {
    console.log(e)
    setSelectedImage(parseInt(e.target.dataset.imageId))
    setFeaturedImage(e.target.dataset.imageId)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", imageToUpload)
    upload(apiUrl + "/upload", formData)
    console.log(imageToUpload)
  }

  return (
    <div className="gallery-wrapper">
      <div className="gallery">
        <input
          onChange={(e) => setImageToUpload(e.target.files[0])}
          type="file"
          name="image"
          accept="image/png, image/jpeg"
        />

        <button onClick={handleSubmit}>Upload</button>

        {images.map((image) => (
          <Image
            image={image}
            data-image-id={image.id}
            onClick={handleSelectImage}
            selectedImage={selectedImage}
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery
