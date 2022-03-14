import { get, getProtected, upload } from "adapters/xhr"
import { useEffect, useState } from "react"
import Image from "./Image"

import styles from "./Gallery.module.scss"
import ImageInfo from "./ImageInfo"

const Gallery = ({ setFeaturedImage, setShowGallery }) => {
  console.log(styles)
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState()
  const [imageToUpload, setImageToUpload] = useState()
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await getProtected("/images") 
    setImages(res.data)
  }

  const handleClickImage = (image) => {
    setSelectedImage(image)
  }

  const handleSelectImage = () => {
    setFeaturedImage(selectedImage)
    setShowGallery(false)
  }

  const handleSubmit = async (e) => {
    const image = e.target.files[0]
    if (!image) return
    const formData = new FormData()
    formData.append("file", image)
    const res = await upload("/upload", formData)

    if (!res.error) {
      getData()
    }
    
  }

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.gallery}>
        <h2>Gallery</h2>
        <button
          className={styles.gallery__close}
          onClick={() => setShowGallery(false)}
        >
          X
        </button>

        <div className={styles.gallery__body}>
          <div className={styles.gallery__imagesWrapper}>
            <div className={styles.gallery__images}>
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
          <div className={styles.gallery__sidebar}>
            <ImageInfo image={selectedImage} />
          </div>
        </div>
        <div className={styles.gallery__footer}>
          <button
            disabled={selectedImage == null}
            className={styles.gallery__selectImage}
            onClick={handleSelectImage}
          >
            Confirm selection
          </button>

          <label className={styles.gallery__upload}>
            + upload new image
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
  )
}

export default Gallery
