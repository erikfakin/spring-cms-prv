import { get, getProtected, post, update } from "adapters/xhr"
import RichTxtEditor from "components/editPostPage/richTextEditor/RichTextEditor"
import Gallery from "components/editPostPage/gallery/Gallery"
import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import "./EditPostPage.scss"
import { useNavigate, useParams } from "react-router-dom"
import { convertFromHTML } from "draft-js"
import { ContentState } from "draft-js"
import Message from "components/editPostPage/message/Message"
import Select from "react-select"

function EditPostPage() {
  const { postId } = useParams()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [featuredImage, setFeaturedImage] = useState()
  const [showGallery, setShowGallery] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [notice, setNotice] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  let navigate = useNavigate()

  const getInitialData = async () => {
    const cats = await getProtected(apiUrl + "/categories")
    if (cats) {
      setCategories(
        cats.map((category) => {
          return {
            value: category.id,
            label: category.title,
          }
        })
      )
    }

    if (postId) {
      const post = await get(apiUrl + "/posts/" + postId)
      setTitle(post.title)
      setDescription(post.description)
      setFeaturedImage(post.featuredImage)
      const blocks = convertFromHTML(post.content)
      const initialState = ContentState.createFromBlockArray(blocks)
      setEditorState(EditorState.createWithContent(initialState))
      setSelectedCategory(post.category.id)
    } else {
      setTitle("")
      setDescription("")
      setFeaturedImage()
      setEditorState(EditorState.createEmpty())
      setSelectedCategory()
    }
  }

  useEffect(() => {
    getInitialData()
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const rawContentState = convertToRaw(editorState.getCurrentContent())

    const markup = draftToHtml(rawContentState)
    try {
      const data = {
        title,
        description,
        content: markup,
        featuredImage: {
          id: featuredImage.id,
        },
        category: {
          id: selectedCategory,
        },
      }

      const res = postId
        ? await update(apiUrl + "/posts/" + postId, data)
        : await post(apiUrl + "/posts", data)

      const newPost = await res.json()

      setNotice(`Post ${postId ? "edited" : "created"} successfully!`)
      navigate("/edit-post/" + newPost.id)
    } catch (e) {
      console.log(e)
    }
  }

  const handleEditorOnChange = (state) => {
    setEditorState(state)
  }

  return (
    <div className="create-post-wrapper">
      {notice && <Message message={notice} onClose={() => setNotice("")} />}
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
            <label className="create-post__description">
              Category
              <Select
                options={categories}
                value={categories.filter(
                  (category) => category.value === selectedCategory
                )}
                onChange={(e) => setSelectedCategory(e.value)}
              />
            </label>
          </div>
          <div className="create-post__header__featured-image">
            <label className="create-post__header__featured-image__label">
              Featured Image
              <div
                className="create-post__header__featured-image__image-wrapper"
                onClick={() => setShowGallery(true)}
              >
                {featuredImage ? (
                  <img
                    className="create-post__header__featured-image__image"
                    src={featuredImage.src}
                  />
                ) : (
                  <div>Set featured image</div>
                )}
              </div>
            </label>
          </div>
          <button className="create-post__submit" onClick={handleSubmit}>
            {postId ? "Update post" : "Create post"}
          </button>
        </div>

        {showGallery ? (
          <Gallery
            className="create-post__gallery"
            setFeaturedImage={setFeaturedImage}
            setShowGallery={setShowGallery}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default EditPostPage
