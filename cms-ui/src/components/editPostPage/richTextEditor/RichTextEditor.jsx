import { Editor, RichUtils, getDefaultKeyBinding } from "draft-js"
import { useRef } from "react"

import BlockStyleControls from "./BlockStyleControls"
import InlineStyleControls from "./InlineStyleControls"

import "draft-js/dist/Draft.css"
import "./RichTextEditor.css"

const RichTxtEditor = ({ editorState, onChange }) => {
  const editor = useRef(null)

  const focus = () => {
    console.log("focius")
    if (editor.current) editor.current.focus()
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return "handled"
    }
    return "not-handled"
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */)
      if (newEditorState !== editorState) {
        onChange(newEditorState)
      }
      return null
    }
    return getDefaultKeyBinding(e)
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={(blockType) => {
          const newState = RichUtils.toggleBlockType(editorState, blockType)
          onChange(newState)
        }}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={(inlineStyle) => {
          const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
          onChange(newState)
        }}
      />
      <div onClick={focus} className={"RichTextEditor"}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder="Write your post..."
          ref={editor}
          spellCheck={true}
        />
      </div>
    </div>
  )
}

export default RichTxtEditor
