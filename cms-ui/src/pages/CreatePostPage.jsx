import { post } from "adapters/xhr"
import RichTxtEditor from "components/createPost/RichTextEditor"
import Gallery from "components/gallery/Gallery"
import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import { useState } from "react"
import { apiUrl } from "utils/constants/env"
import "./CreatePostPage.css"

function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [featuredImage, setFeaturedImage] = useState()

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
          id: featuredImage,
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
    <div className="create-post">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="create-post__title">
          Title
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="create-post__description">
          Description
          <input
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <RichTxtEditor
          className="create-post__content"
          editorState={editorState}
          onChange={handleEditorOnChange}
        />

        <input type="submit" value="Submit" />
        <Gallery
          className="create-post__gallery"
          setFeaturedImage={setFeaturedImage}
        />
      </form>
    </div>
  )
}

export default CreatePostPage
