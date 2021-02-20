import React from 'react'
// import { Modal } from 'materialize-css'
import { Dialog } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons';

import styles from './termsAndConditionsModal.module.scss'

const TermsAndConditionsModal = (props: any) => {

  const { show, onClosed, large, content } = props

  return (
    <Dialog
      open={show}
      onClose={onClosed}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={'xl'}
    >
      <div className={styles.register_containter} style={{ gridTemplateColumns: '100%' }}>
        <HighlightOff onClick={() => onClosed()} className={styles.close_icon} />

        <div className={styles.register_form}>
          <h5>Términos y condiciones</h5>
          <br />
          <p dangerouslySetInnerHTML={{
            __html: content
          }}></p>
          <br />
          <br />
        </div>
      </div>

    </Dialog>
  )
}


export default TermsAndConditionsModal