import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./SearchBar.module.scss"

import searchIcon from "static/icons/search.svg"

const SearchBar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/search/?q=" + search)
      setSearch("")
    }
  }

  return (
    <div className={styles.searchBar}>
      <label>
        <img className={styles.searchBar__icon} src={searchIcon} />
        <input
          onKeyDown={handleOnKeyDown}
          name="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
        />
      </label>
    </div>
  )
}

export default SearchBar
