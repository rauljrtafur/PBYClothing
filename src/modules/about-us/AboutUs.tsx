import React, { useEffect, useState } from 'react'
import styles from './AboutUs.module.scss'

import { connect } from 'react-redux'
import { ImageBanner } from '../../components'
import { US } from '../../consts/clothe-names'

const AboutUs = (props) => {

  let { articles, menu } = props

  const [menuSelected, setMenuSelected] = useState<any>({})
  const [itemUs, setItemUs] = useState<any>({})

  useEffect(() => {
    if (articles.length === 0) return
    window.scrollTo(0, 0)
    getItemUs()
    selectMenu()
  }, [articles, menu])

  const getItemUs = () => {
    const itemUs = (articles as any[]).find(item => item.Tipo_Contenido === US)
    setItemUs(itemUs)
  }

  const selectMenu = () => {
    const menuSelected = menu.find(item => item.Nombre_Menu === US)
    if (menuSelected)
      setMenuSelected(menuSelected)
  }

  return (
    <>
      <ImageBanner
        title={menuSelected.Nombre_Menu}
        subtitle={menuSelected.Descripcion_Menu || ''}
        imgSrc={menuSelected.Imagen}
      />

      <div className={styles.content}>
        <h4>{itemUs.Nombre_Articulo}</h4>
        <p dangerouslySetInnerHTML={{
          __html: itemUs.Contenido
        }}></p>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  const { articles, menu } = state
  return { articles: articles.articles, menu: menu.menu }
}

export default connect(mapStateToProps)(AboutUs)
