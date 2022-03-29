import styles from "./Homepage.module.scss"
import ArchiveAllPosts from "components/shared/archive/ArchiveAllPosts"
import ArchivePinnedPosts from "components/shared/archive/ArchivePinnedPosts"

const Homepage = () => {


  return (
    <div className={styles.homeWrapper}>
      <div className={styles.home}>
        
        <section className={styles.home__section}>
         <ArchivePinnedPosts />
        </section>

        <section className={styles.home__section}>
         <ArchiveAllPosts />
        </section>

      </div>
    </div>
  )
}

export default Homepage
