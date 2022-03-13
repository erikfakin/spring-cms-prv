import { get, getProtected, post, update } from "adapters/xhr"
import RichTxtEditor from "components/editPostPage/richTextEditor/RichTextEditor"
import Gallery from "components/editPostPage/gallery/Gallery"
import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/constants/env"
import styles from "./EditPostPage.module.scss"
import { useNavigate, useParams } from "react-router-dom"
import { convertFromHTML } from "draft-js"
import { ContentState } from "draft-js"
import Message from "components/editPostPage/message/Message"
import Select from "react-select"
import TextInput from "components/editPostPage/textInput/TextInput"
import SelectInput from "components/editPostPage/selectInput/SelectInput"
import FeaturedImage from "components/editPostPage/featuredImage/FeaturedImage"

import SubmitButton from "components/shared/buttons/SubmitButton"
import CreateCategory from "components/shared/forms/CreateCategory"
import PinnedCheckbox from "components/shared/inputs/PinnedCheckbox"

function EditPostPage() {
  const { postId } = useParams()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [featuredImage, setFeaturedImage] = useState()
  const [showGallery, setShowGallery] = useState(false)
  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [notice, setNotice] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  const [pinned, setPinned] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [postId])

  const handleCreateCategory = (category) => {
    getCategories()
    setSelectedCategory(category.id)
  }
  const getCategories = async () => {
    const res = await get(apiUrl + "/categories")
    console.log(res)
    if (res) {
      setCategories(
        res.map((category) => {
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
      const post = await get(apiUrl + "/posts/" + postId)
      setTitle(post.title)
      setDescription(post.description)
      setFeaturedImage(post.featuredImage)
      const blocks = convertFromHTML(post.content)
      const initialState = ContentState.createFromBlockArray(blocks)
      setEditorState(EditorState.createWithContent(initialState))
      setSelectedCategory(post.category.id)
      setPinned(post.pinned)
    } else {
      setTitle("")
      setDescription("")
      setFeaturedImage()
      setEditorState(EditorState.createEmpty())
      setSelectedCategory()
    }
  }

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
        pinned,
      }

      console.log(data)

      const res = postId
        ? await update(apiUrl + "/posts/" + postId, data)
        : await post(apiUrl + "/posts", data)

      const newPost = await res.json()

      setNotice(`Post ${postId ? "edited" : "created"} successfully!`)
      navigate("/edit-post/" + newPost.id)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.editPostWrapper}>
      {notice && <Message message={notice} onClose={() => setNotice("")} />}
      {showCreateCategory && (
        <CreateCategory
          onSubmit={handleCreateCategory}
          onClose={() => {
            setShowCreateCategory(false)
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
              onClick={() => setShowCreateCategory(true)}
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

        {showGallery ? (
          <Gallery
            className={styles.editPost__gallery}
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
