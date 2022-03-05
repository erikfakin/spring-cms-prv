import { useState } from "react"

const Image = ({ image, selectedImage, onClick }) => {
  
  return (
    <img
      className={selectedImage === image ? "selected image" : "image"}
      src={image.src.replace(/\\/g, "/")}
      alt={image.alt}
      key={image.id}
      onClick={() => onClick(image)}
    />
  )
}

export default Image
