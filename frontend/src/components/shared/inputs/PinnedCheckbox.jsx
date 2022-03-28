import style from "./PinnedCheckbox.module.scss"

const PinnedCheckbox = ({ checked, onClick }) => {
  return (
    <label className={style.pinnedCheckbox}>
      <input
        className={style.pinnedCheckbox__input}
        type="checkbox"
        name="pinned"
        checked={checked}
        onClick={onClick}
      />
      Pinned
    </label>
  )
}

export default PinnedCheckbox
