import { get, post } from "adapters/xhr"
import RichTxtEditor from "components/editPostPage/richTextEditor/RichTextEditor"
import Gallery from "components/editPostPage/gallery/Gallery"
import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import "./EditPostPage.scss"
import { useParams } from "react-router-dom"

function EditPostPage() {
  const { postId } = useParams()
  console.log(postId)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [featuredImage, setFeaturedImage] = useState()
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    if (postId) {
      const fetchData = async () => {
        const post = await get(apiUrl + "/posts/" + postId)
        setTitle(post.title)
        setDescription(post.description)
      }
      fetchData()
    }
  }
    , [])

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleSubmit = async (e) => {
    e.preventDefault()
    const rawContentState = convertToRaw(editorState.getCurrentContent())

    const markup = draftToHtml(rawContentState)
    try {
      await post(apiUrl + "/posts", {
        title,
        description,
        content: markup,
        featuredImage: {
          id: featuredImage.id,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleImageSelect = (e) => {
    setFeaturedImage(e.target.dataset.imageId)
  }

  const handleEditorOnChange = (state) => {
    setEditorState(state)
  }

  return (
    <div className="create-post-wrapper">
      
      <div className="create-post">
      <h1>Edit post</h1>
      <RichTxtEditor
        className="create-post__content"
        editorState={editorState}
        onChange={handleEditorOnChange}
      />
      <div className="create-post__header">
        <div className="create-post__header__info">
          <label className="create-post__title">
            Title
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          <label className="create-post__description">
            Description
            <input
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </label>
        </div>
        <div className="create-post__header__featured-image">
          <label className="create-post__header__featured-image__label">
            Featured Image
            <div className="create-post__header__featured-image__image-wrapper" onClick={() => setShowGallery(true)}>
              {featuredImage ? <img className="create-post__header__featured-image__image" src={featuredImage.src} /> : <div>Set featured image</div>}
            </div>
          </label>
        </div>
        <button onClick={handleSubmit}>Submit</button>

      </div>
      




      {showGallery ?
        <Gallery
          className="create-post__gallery"
          setFeaturedImage={setFeaturedImage}
          setShowGallery={setShowGallery}
        /> : ""}
    </div>
    </div>
  )
}

export default EditPostPage
