import { get, post, update } from "adapters/xhr"
import RichTxtEditor from "components/editPostPage/richTextEditor/RichTextEditor"
import Gallery from "components/editPostPage/gallery/Gallery"
import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import { useEffect, useState } from "react"
import styles from "./EditPostPage.module.scss"
import { useNavigate, useParams } from "react-router-dom"
import { convertFromHTML } from "draft-js"
import { ContentState } from "draft-js"
import FeaturedImage from "components/editPostPage/featuredImage/FeaturedImage"

import SubmitButton from "components/shared/buttons/SubmitButton"
import EditCategory from "components/shared/forms/EditCategory"
import PinnedCheckbox from "components/shared/inputs/PinnedCheckbox"
import SelectInput from "components/shared/inputs/SelectInput"
import TextInput from "components/shared/inputs/TextInput"
import SuccessMessage from "components/shared/message/SuccessMessage"

function EditPostPage() {
  const { postId } = useParams()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [featuredImage, setFeaturedImage] = useState()
  const [showGallery, setShowGallery] = useState(false)
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [notice, setNotice] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  const [pinned, setPinned] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [postId])

  const handleEditCategory = (category) => {
    getCategories()
    setSelectedCategory(category.id)
  }

  const getCategories = async () => {
    const res = await get("/categories")
    if (res) {
      setCategories(
        res.data.map((category) => {
          return {
            value: category.id,
            label: category.title,
          }
        })
      )
    }
  }

  const getData = async () => {
    getCategories()
    if (postId) {
      const post = await get("/posts/" + postId)
      setTitle(post.data.title)
      setDescription(post.data.description)
      setFeaturedImage(post.data.featuredImage)
      const blocks = convertFromHTML(post.data.content)
      const initialState = ContentState.createFromBlockArray(blocks)
      setEditorState(EditorState.createWithContent(initialState))
      setSelectedCategory(post.data.category.id)
      setPinned(post.data.pinned)
    } else {
      setTitle("")
      setDescription("")
      setFeaturedImage()
      setEditorState(EditorState.createEmpty())
      setSelectedCategory()
      setPinned(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const markup = draftToHtml(rawContentState)
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
      pinned,
    }

    const res = postId
      ? await update("/posts/" + postId, data)
      : await post("/posts", data)


    const newPost = await res.data

    setNotice(`Post ${postId ? "edited" : "created"} successfully!`)
    navigate("/edit-post/" + newPost.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className={styles.editPostWrapper}>
      {notice && <SuccessMessage message={notice} onClose={() => setNotice("")} />}
      {showEditCategory && (
        <EditCategory
          onSubmit={handleEditCategory}
          onClose={() => {
            setShowEditCategory(false)
          }}
        />
      )}
      <h1 className={styles.editPost__pageTitle}>
        {postId ? "Edit post" : "Create post"}
      </h1>
      <div className={styles.editPost}>
        <RichTxtEditor
          className={styles.editPost__content}
          editorState={editorState}
          onChange={(state) => setEditorState(state)}
        />
        <div className={styles.editPost__header}>
          <div className={styles.editPost__header__info}>
            <TextInput
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              value={title}
            />
            <TextInput
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              value={description}
            />
            <SelectInput
              label="Category"
              options={categories}
              value={categories.filter(
                (category) => category.value === selectedCategory
              )}
              onChange={(e) => setSelectedCategory(e.value)}
            />
            <button
              className={styles.editPost__createCategory}
              onClick={() => setShowEditCategory(true)}
            >
              + add new category
            </button>
          </div>

          <PinnedCheckbox checked={pinned} onClick={() => setPinned(!pinned)} />

          <FeaturedImage
            featuredImage={featuredImage}
            onClick={(e) => setShowGallery(true)}
          />

          <SubmitButton onClick={handleSubmit}>
            {postId ? "Update post" : "Create post"}
          </SubmitButton>
        </div>

        {showGallery && (
          <Gallery
            className={styles.editPost__gallery}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
            setShowGallery={setShowGallery}
          />
        )}
      </div>
    </div>
  )
}

export default EditPostPage
