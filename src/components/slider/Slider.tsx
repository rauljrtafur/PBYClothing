import React from 'react'
import styles from "./Slider.module.scss"
import { useDispatch } from 'react-redux'

import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import { setFilterProductsAction } from '../../store/actions';
import withAutoplay from 'react-awesome-slider/dist/autoplay';


function Slider({ items, history }) {

  const dispatch = useDispatch();
  const AutoplaySlider = withAutoplay(AwesomeSlider);
// Cambios de Librería a awesome slider Carlos Hortúa
  return (
    <>
  <AutoplaySlider 
  cssModule={AwesomeSliderStyles}
  className={styles.slider_container}
  play={true}
  cancelOnInteraction={false} 
  interval={6000}
  >
    
    {items.map((item: any, i) => {
          return (

          <div 
          key={i} 
          data-src={item.Imagen}
          onClick={() => {
                console.log(item);
                if (!item.Genero && !item.Coleccion) {
                  window.location.replace(item.Url)
                  return
                }

                if (!item.Genero && item.Coleccion) {
                  history.push({ pathname: `colecciones` })
                  dispatch(setFilterProductsAction(item.Coleccion))
                  return
                }
                history.push({ pathname: `${item.Genero.toLocaleLowerCase()}` })
                if (!item.TipoProducto) return
                dispatch(setFilterProductsAction(item.TipoProducto))
              }} 
          />
          )
         }
    )}
  </AutoplaySlider>

      {/* <Carousel
        indicators={false}
        animation={'fade'}
        interval={6000}
        navButtonsAlwaysVisible={true}
        fullHeightHover={false}
        indicatorProps={{ className: '', style: {} }}
        activeIndicatorProps={{ className: '', style: {} }}
      >
        {items.map((item: any, i) => {
          return (
            <div-
              key={i}
              className={styles.slider_container}
              onClick={() => {
                console.log(item);
                if (!item.Genero && !item.Coleccion) {
                  window.location.replace(item.Url)
                  return
                }

                if (!item.Genero && item.Coleccion) {
                  history.push({ pathname: `colecciones` })
                  dispatch(setFilterProductsAction(item.Coleccion))
                  return
                }
                history.push({ pathname: `${item.Genero.toLocaleLowerCase()}` })
                if (!item.TipoProducto) return
                dispatch(setFilterProductsAction(item.TipoProducto))
              }}
            >
              <img src={item.Imagen} alt={item.Nombre_Articulo} />
              <div className={styles.content_text + ' ' + styles.topRigth}>
                <h2>{item.Nombre_Articulo}</h2>
                <span>{item.Descripcion_Articulo}</span>
              </div>
            </div>
          )
        }
        )}
        
      </Carousel> */}
    </>
  
  );
}

export default Slider

