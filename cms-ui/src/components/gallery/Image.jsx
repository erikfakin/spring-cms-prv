import { useState } from "react"

const Image = ({ image, selectedImage, onClick }) => {
  console.log(image.id, selectedImage)
  return (
    <img
      className={selectedImage === image.id ? "selected image" : "image"}
      src={image.src.replace(/\\/g, "/")}
      alt={image.alt}
      key={image.id}
      data-image-id={image.id}
      onClick={onClick}
    />
  )
}

export default Image
