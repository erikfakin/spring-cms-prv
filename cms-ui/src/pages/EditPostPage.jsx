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

  useEffect(() => {
    getInitialData()
  }, [postId])

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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      console.log(e)
    }
  }




  return (
    <div className={styles.editPostWrapper}>
      {notice && <Message message={notice} onClose={() => setNotice("")} />}
      <h1 className={styles.editPost__pageTitle}>{postId ? "Edit post" : "Create post"}</h1>
      <div className={styles.editPost}>

        <RichTxtEditor
          className={styles.editPost__content}
          editorState={editorState}
          onChange={state => setEditorState(state)}
        />
        <div className={styles.editPost__header}>
          <div className={styles.editPost__header__info}>

            <TextInput onChange={e => setTitle(e.target.value)} label="Title" value={title} />
            <TextInput onChange={e => setDescription(e.target.value)} label="Description" value={description} />
            <SelectInput
              label="Category"
              options={categories}
              value={categories.filter(
                (category) => category.value === selectedCategory
              )}
              onChange={(e) => setSelectedCategory(e.value)} />

          </div>
          <FeaturedImage featuredImage={featuredImage} onClick={e => setShowGallery(true)} />

          <button className={styles.editPost__submit} onClick={handleSubmit}>
            {postId ? "Update post" : "Create post"}
          </button>
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
