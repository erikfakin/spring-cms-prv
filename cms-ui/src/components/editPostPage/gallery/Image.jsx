import styles from "./Image.module.scss"

const Image = ({ image, selectedImage, onClick }) => {
  return (
    <img
      className={
        image === selectedImage
          ? `${styles.image} ${styles.image___selected}`
          : `${styles.image}`
      }
      src={image.src.replace(/\\/g, "/")}
      alt={image.alt}
      key={image.id}
      onClick={() => onClick(image)}
    />
  )
}

export default Image
