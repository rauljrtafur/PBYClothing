import React, { useEffect, useState } from 'react'
import styles from './News.module.scss'
import { ImageBanner } from '../../components'
import encabezado from '../../assets/images_pby/Home/1.jpg'
import Moment from 'react-moment';
import 'moment/locale/es';

import { connect } from 'react-redux'
import { NEWS } from '../../consts/clothe-names'
import { PbyService } from '../../services/pby-services'

 Moment.globalLocale = 'es';
 
Moment.globalLocal = true;

const News = (props) => {

  let { history, menu } = props

  const [menuSelected, setMenuSelected] = useState<any>({})
  const [itemsNews, setItemsNews] = useState<any[]>([])
   

  useEffect(() => {
    if (menu.length === 0) return
    window.scrollTo(0, 0)
    getItemsNews()
    selectMenu()
  }, [menu])


   const convertISOStringToMonthDay = date => {
  const tempDate = new Date(date).toString().split(' ');
  const formattedDate = `${tempDate[1]} ${+tempDate[2]}`;
  console.log(formattedDate);
  return formattedDate;
};

  const getItemsNews = () => {
    PbyService.getArticleBlog().then(itemNews => {
      console.log(itemNews);
      setItemsNews(itemNews)
    })
  }

  const selectMenu = () => {
    const menuSelected = menu.find(item => item.Nombre_Menu === NEWS)
    if (menuSelected)
      setMenuSelected(menuSelected)
  }

  return (
    <>
      <ImageBanner
        title={menuSelected.Nombre_Menu}
        subtitle={menuSelected.Descripcion_Menu || ''}
        imgSrc={menuSelected.Imagen}
      // imgSrc={encabezado}
      />
      <div className={styles.container_list_news} >
        {itemsNews.map((item, i) => (
          <div key={i} className={styles.item_news}>
            <div className={styles.image_item} >
              <img 
                src={item.Imagen}
                alt={item.Imagen}
                onClick={() => {
                  history.push({ pathname: '/noticias/' + item.Id })
                }} />
            </div>
            <div className={styles.content_item} onClick={() => {
              history.push({ pathname: '/noticias/' + item.Id })
            }}>
              {/* <h4 className={styles.text_new}
                dangerouslySetInnerHTML={{
                  __html: item.Contenido.toUpperCase()
                }}>
              </h4> */}

              <h4>{item.Nombre_Articulo}</h4>
              <br />
              <p> <Moment>{item.Fecha_Publicacion}</Moment></p>
              <br />
              <p>{item.Descripcion_Articulo}</p>

              <h5>{item.subtitle}</h5>
              <br />
              <p>{item.text}</p>
            </div>
          </div>
        ))
        }
      </div>
    </>

  )
}

function mapStateToProps(state) {
  const { menu } = state
  return { menu: menu.menu }
}

export default connect(mapStateToProps)(News)
