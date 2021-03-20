import React, { Fragment, useEffect, useState } from 'react'

import styles from './Home.module.scss'
import { Slider } from '../../components';

import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { PbyService } from '../../services/pby-services';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { setFilterProductsAction } from '../../store/actions';

function Home(props) {

  const dispatch = useDispatch()
  let { articles, history } = props

  const [itemsHomeBanner, setItemsHomeBanner] = useState<any[]>([])
  const [itemsDestacado, setItemsDestacado] = useState<any[]>([])
  const [itemContenido, setItemContenido] = useState<any>({})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  useEffect(() => {
    if (articles.length === 0) return
    window.scrollTo(0, 0)

    getItemContenido()
    getItemsDestacado()
    getItemsHomeBanner()
  }, [articles])

  const getItemsHomeBanner = () => {
    const items = (articles as any[]).filter(item => item.Codigo_Contenido === 'HBN')
    setItemsHomeBanner(items)
  }

  const getItemsDestacado = () => {
    const items = (articles as any[]).filter(item => item.Codigo_Contenido === 'DST')
    setItemsDestacado(items)
  }

  const getItemContenido = () => {
    const item = (articles as any[]).find(item => item.Codigo_Contenido === 'CMUL')
    setItemContenido(item)
  }

  const handleChange = (event) => {
    const { target: { name, value } } = event
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = () => {
    PbyService.newsLetterRegister(form.firstName, form.lastName, form.email).then(response => {
      if (!response.status) {
        console.log(response);
        toast.error(response.Message)
        return
      }
      toast.success(response.Message)
      setForm({
        firstName: '',
        lastName: '',
        email: '',
      })
    })
  }


  return (
    <Fragment>
      <Slider items={itemsHomeBanner} history={history} />
      {/* <pre>
        {JSON.stringify(itemsHomeBanner, null, 1)}
      </pre> */}

      <div className={styles.image_container}>
        {itemsDestacado.map((item, i) =>
        (
          <div key={i} className={styles.item_image} onClick={() => {
            if (!item.Genero && item.Coleccion) {
              history.push({ pathname: `colecciones` })
              dispatch(setFilterProductsAction(item.Coleccion))
              return
            }
            history.push({ pathname: `${item.Genero.toLocaleLowerCase()}` })
            if (!item.TipoProducto) return
            dispatch(setFilterProductsAction(item.TipoProducto))
          }}>
            <img src={item.Imagen} alt="" />
            <div className={styles.item_hover}>
              <span>{item.Nombre_Articulo}</span>
            </div>
          </div>
        )
        )}
      </div>
      <div className={styles.video_container}>
        <ReactPlayer url={itemContenido.Contenido_Multimedia} width={'100%'} height={'auto'} playing muted controls />
      </div>

      {/* <div className={styles.outstanding} style={{ background: `url('${itemContenido.Imagen}')` }}>
        <div className={styles.text_outstanding}>
          <h2>{itemContenido ? itemContenido.Nombre_Articulo : ''}</h2>
          <h4>{itemContenido ? itemContenido.Descripcion_Articulo : ''}</h4>
        </div>
        <div className={styles.video_container}>
          <ReactPlayer url={itemContenido.Contenido_Multimedia} width={'100vw'} height={'700px'} playing muted controls />
        </div>
      </div> */}

      {/* Input Subscribe */}
      <section className={styles.subscribe_container}>
        <div className={styles.content_subscribe}>
          <h3>¡Suscríbete!</h3>

          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              color="secondary"
              className={styles.subscribe_input}
              label="Nombre"
              onChange={handleChange}
              name="firstName"
              type="text"
              validators={['required']}
              errorMessages={['Campo requerido']}
              value={form.firstName}
            />
            <TextValidator
              color="secondary"
              className={styles.subscribe_input}
              label="Apellido"
              onChange={handleChange}
              name="lastName"
              type="text"
              validators={['required']}
              errorMessages={['Campo requerido']}
              value={form.lastName}
            />
            <TextValidator
              color="secondary"
              className={styles.subscribe_input}
              label="Correo"
              onChange={handleChange}
              name="email"
              type="text"
              validators={['required', 'isEmail']}
              errorMessages={['Campo requerido', 'Correo no válido']}
              value={form.email}
            />
            <div className={styles.btn_subscribe}>
              <Button type="submit" color="secondary" variant="outlined">Enviar</Button>
            </div>
          </ValidatorForm>
        </div>
      </section>

    </Fragment>
  )
}

function mapStateToProps(state) {
  const { articles } = state
  return articles
}

export default connect(mapStateToProps)(Home)
