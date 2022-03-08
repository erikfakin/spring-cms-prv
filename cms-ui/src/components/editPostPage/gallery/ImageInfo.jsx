import { update } from "adapters/xhr"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import styles from "./ImageInfo.module.scss"

const ImageInfo = ({ image }) => {
  const [title, setTitle] = useState("")
  const [alt, setAlt] = useState("")
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    if (image) {
      setTitle(image.title || "")
      setAlt(image.alt || "")
    }
  }, [image])

  const handleSubmit = () => {
    const e = update(apiUrl + "/images/" + image.id, {
      title,
      alt
    })

    console.log(e)
  }

  console.log(image)
  return (
    <div className={styles.imageInfo}>
      <img className={styles.imageInfo__image} src={image?.src} />
      <label className={styles.imageInfo__title}>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setChanged(true)
            setTitle(e.target.value)
          }}
        />
      </label>
      <label className={styles.imageInfo__alt}>
        Alt
        <input
          type="text"
          className={styles.imageInfo__alt}
          value={alt}
          onChange={(e) => {
            setChanged(true)
            setAlt(e.target.value)
          }}
        />
      </label>
      {changed? <button onClick={handleSubmit}>Update</button> :""}
    </div>
  )
}

export default ImageInfo
