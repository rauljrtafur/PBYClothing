import React from 'react'
import styles from './ImageBanner.module.scss'

const ImageBanner = (props: any) => {

  const { title, subtitle, imgSrc } = props

  return (
    <div className={styles.main_image_banner}>

      {/* <div className={styles.banner_title}>
        <div className={styles.new_title_content}>
          <h2>{title}</h2>
          {subtitle && <h4>{subtitle}</h4>}
        </div>
      </div> */}

      <img src={imgSrc} alt="" />
    </div>
  )
}

export default ImageBanner
