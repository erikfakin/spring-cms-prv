import { update } from "adapters/xhr"
import SubmitButton from "components/shared/buttons/SubmitButton"
import TextInput from "components/shared/inputs/TextInput"
import { useEffect, useState } from "react"
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

  const handleSubmit = async () => {
    const res = await update("/images/" + image.id, {
      title,
      alt,
    })
    console.log(res)
    if (!res.error) setChanged(false)
  }

  return (
    <div className={styles.imageInfo}>
      {image && <>
        <div className={styles.imageInfo__imageWrapper}>
          <img className={styles.imageInfo__image} src={image?.src} />
        </div>

        <TextInput label="Image title" value={title} onChange={(e) => {
          setChanged(true)
          setTitle(e.target.value)
        }} />

        <TextInput label="Image alt" value={alt} onChange={(e) => {
          setChanged(true)
          setAlt(e.target.value)
        }} />


        {changed ? <SubmitButton onClick={handleSubmit}>Update</SubmitButton> : ""}
      </>
      }
    </div>

  )
}

export default ImageInfo
