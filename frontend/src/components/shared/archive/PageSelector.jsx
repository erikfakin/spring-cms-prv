import styles from "./PageSelector.module.scss"

const PageSelector = ({ currentPage, totalPages, setPage }) => {
  return (
    <div className={styles.pageSelector}>
      {Array.from(Array(totalPages)).map((e, i) => (
        <button
          className={`${styles.pageSelector__button} ${
            currentPage === i + 1 ? styles.pageSelector__current : ""
          }`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

export default PageSelector
