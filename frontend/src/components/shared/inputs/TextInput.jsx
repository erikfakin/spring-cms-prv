import styles from "./TextInput.module.scss"

const TextInput = ({ label, value, onChange, onKeyDown, autofocus }) => {
  return (
    <label
      className={`${styles.label} ${label === "Title" ? styles.title : ""}`}
    >
      {label}
      <input
        type="text"
        name={label}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        autoFocus={autofocus}
      />

    </label>
  )
}

export default TextInput
