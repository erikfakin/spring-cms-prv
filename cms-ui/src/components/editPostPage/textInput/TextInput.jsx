import styles from "./TextInput.module.scss"

const TextInput = ({ label, value, onChange, onKeyDown }) => {
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
      />
    </label>
  )
}

export default TextInput
