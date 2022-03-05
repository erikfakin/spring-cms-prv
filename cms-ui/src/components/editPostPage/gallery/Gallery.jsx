import { get, upload } from "adapters/xhr"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import Image from "./Image"

import "./Gallery.scss"
import ImageInfo from "./ImageInfo"

const Gallery = ({ setFeaturedImage, setShowGallery }) => {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState()
  const [imageToUpload, setImageToUpload] = useState()
  useEffect(async () => {
    getData()
  }, [])

  const getData = async () => {
    setImages(await get(apiUrl + "/images"))

  }

  const handleClickImage = (image) => {
    console.log(image)
    setSelectedImage(image)
  }

  const handleSelectImage = () => {
    setFeaturedImage(selectedImage)
    setShowGallery(false)

  }

  const handleSubmit = async (e) => {
    const image = (e.target.files[0])
    if (!image) return
    const formData = new FormData()
    formData.append("file", image)
    upload(apiUrl + "/upload", formData).then(res => {
      if (res.ok) {
        getData()
      }
    })
  }




  return (
    <div className="gallery-wrapper">
      <div className="gallery">

        <button className="gallery__close" onClick={() => setShowGallery(false)}>X</button>

        <div className="gallery__body">
          <div className="gallery__images-wrapper">
            <h2>Gallery</h2>
            <div className="gallery__images">
              {images.map((image) => (
                <Image
                  image={image}
                  onClick={handleClickImage}
                  selectedImage={selectedImage}
                  key={image.id}
                />
              ))}
            </div>


          </div>
          <div className="gallery__sidebar">

            <ImageInfo image={selectedImage} />



          </div>
        </div>
        <div className="gallery__footer">
          <button disabled={selectedImage == null} className="gallery__select-image" onClick={handleSelectImage}>Confirm selection</button>
          <div className="gallery__upload">
            <label >
              Upload new image
              <input
                onChange={handleSubmit}

                type="file"
                name="image"
                accept="image/png, image/jpeg"
              />
            </label>



          </div>
        </div>


      </div>
    </div>
  )
}

export default Gallery
