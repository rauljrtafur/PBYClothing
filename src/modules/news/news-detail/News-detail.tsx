import React, { useEffect, useState } from 'react'
import styles from './News_detail.module.scss'

import { connect } from 'react-redux'
import { PbyService } from '../../../services/pby-services'
// import { ImageBanner } from '../../../components'
import { NEWS } from '../../../consts/clothe-names'

const NewsDetail = (props) => {

  let { history, menu } = props

  const [menuSelected, setMenuSelected] = useState<any>({})
  const [newSelected, setNewSelected] = useState<any>(null)

  useEffect(() => {
    if (menu.length === 0) return
    window.scrollTo(0, 0)
    selectMenu()
  }, [menu])

  useEffect(() => {
    window.scrollTo(0, 0)
    const newId = (history.location.pathname as string).split('/')[2]
    // getProductDetail(idCurrentProduct)
    getItemsNews(newId)
  }, [history.location.pathname])

  const getItemsNews = (newId) => {
    PbyService.getArticleBlog().then(itemNews => {
      const newSelected = itemNews.find(item => String(item.Id) === newId)
      if (!newSelected) return
      setNewSelected(newSelected)
    })
  }

  const selectMenu = () => {
    const menuSelected = menu.find(item => item.Nombre_Menu === NEWS)
    if (menuSelected)
      setMenuSelected(menuSelected)
  }

  return (
    <>
      {/* <ImageBanner
        title={menuSelected.Nombre_Menu}
        subtitle={menuSelected.Descripcion_Menu || 'New Capsule 20'}
        imgSrc={menuSelected.Imagen}
      // imgSrc={encabezado}
      /> */}
      {newSelected ?
        <div className={styles.container_new_detail}>
          <h4 className={styles.title_new}>{newSelected.Nombre_Articulo}</h4>

          <p className={styles.description_new}>
            {newSelected.Descripcion_Articulo}
          </p>

          <div className={styles.content_new}>
            {/* <div className={styles.content_image_new}>
              <img src={newSelected.Imagen} alt="" />
            </div> */}
            <div className={styles.text_new}
              dangerouslySetInnerHTML={{
                __html: newSelected.Contenido
              }}>
            </div>
          </div>

        </div>
        : null}
    </>

  )
}

function mapStateToProps(state) {
  const { menu } = state
  return { menu: menu.menu }
}

export default connect(mapStateToProps)(NewsDetail)
