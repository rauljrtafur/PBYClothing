import React from 'react'
// import { Modal } from 'materialize-css'
import { Dialog } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons';

import styles from './ImageCustomModal.module.scss'

const ImageCustomModal = (props: any) => {

  const { show, onClosed, children, showImage = true, large } = props

  return (
    <Dialog
      open={show}
      onClose={onClosed}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={!large ? 'sm' : 'md'}
    >
      <div className={styles.register_containter} style={{ gridTemplateColumns: showImage ? '50% 50%' : '100%' }}>
        <HighlightOff onClick={() => onClosed()} className={styles.close_icon} />

        {showImage ? (
          <>
            <div className={styles.image_content}>
              <img src={require('../../assets/images_pby/news_letter.jpg')} alt="" />
            </div>
            <div className={styles.register_form}>
              {children}
            </div>
          </>
        ) : children}
      </div>

    </Dialog>
  )
}


export default ImageCustomModal