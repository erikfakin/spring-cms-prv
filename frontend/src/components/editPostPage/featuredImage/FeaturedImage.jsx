import styles from './FeaturedImage.module.scss'

const FeaturedImage = ({onClick, featuredImage}) => {
    return (
        <div className={styles.featuredImage}>
            <label className={styles.featuredImage__label}>
                Featured Image
                <div onClick={onClick} className={styles.featuredImage__imageWrapper}>
                {featuredImage? <img
                            className={styles.featuredImage__image}
                            src={featuredImage.src}
                            alt={featuredImage.alt}
                        /> :
                        <div className={styles.featuredImage__noImage}><p>Select featured image</p></div>}
                    
                        
                    
                </div>
            </label>
        </div>
    )
}

export default FeaturedImage