import { useEffect, useState } from "react"
import styles from "./ImageInfo.module.scss"

const ImageInfo = ({ image }) => {
  const [title, setTitle] = useState("")
  const [alt, setAlt] = useState("")
  useEffect(() => {
    if (image) {
      setTitle(image.title || "")
      setAlt(image.alt || "")
    }
  }, [image])

  console.log(image)
  return (
    <div className={styles.imageInfo}>
      <img className={styles.imageInfo__image} src={image?.src} />
      <label className={styles.imageInfo__title}>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className={styles.imageInfo__alt}>
        Alt
        <input
          type="text"
          className={styles.imageInfo__alt}
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
      </label>
    </div>
  )
}

export default ImageInfo
