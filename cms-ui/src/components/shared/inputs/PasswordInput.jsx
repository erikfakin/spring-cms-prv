import styles from "./PasswordInput.module.scss"

const PasswordInput = ({ label, value, onChange, onKeyDown, autofocus }) => {
  return (
    <label
      className={`${styles.label} ${label === "Title" ? styles.title : ""}`}
    >
      {label}
      <input
        type="password"
        name={label}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        autoFocus={autofocus}
      />
    </label>
  )
}

export default PasswordInput
