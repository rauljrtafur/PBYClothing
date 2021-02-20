import React, { Fragment, useEffect, useState } from 'react'

import styles from './Contact.module.scss'
import { ImageBanner } from '../../components'

import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { CONTACT } from '../../consts/clothe-names'
import { toast } from 'react-toastify'
import { PbyService } from '../../services/pby-services'

const Contact = ({ menu }) => {

  const [dataForm, setDataForm] = useState<any>({
    Name: '',
    Email: '',
    Message: '',
  })

  const [menuSelected, setMenuSelected] = useState<any>({})

  useEffect(() => {
    window.scrollTo(0, 0)
    selectMenu()
  }, [menu])

  const selectMenu = () => {
    const menuSelected = menu.find(item => item.Nombre_Menu === CONTACT)
    if (menuSelected)
      setMenuSelected(menuSelected)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let isValid = true
    const arrayKeys = ['Name', 'Email']
    for (const key of arrayKeys) {
      if (!dataForm[key]) {
        isValid = false
        break
      }
    }

    if (!isValid) {
      toast.warning(`Debe diligenciar los campos obligatorios`)
      return
    }
    PbyService.sendContact(dataForm).then(response => {
      if (!response) return
      if (!response.status) {
        toast.error(response.Message)
        return
      }
      toast.success(response.Message)
      setDataForm({
        Name: '',
        Email: '',
        Message: '',
      })
    })

  }

  const changeValDataForm = (name, value) => {
    setDataForm({ ...dataForm, [name]: value })
  }

  return (
    <Fragment>
      <ImageBanner
        title={menuSelected.Nombre_Menu}
        subtitle={menuSelected.Descripcion_Menu || ''}
        imgSrc={menuSelected.Imagen}
      // imgSrc={image2}
      />

      <div className={styles.about_us_form}>

        <div className={styles.form_container}>

          <form noValidate autoComplete="off">
            <p style={{ margin: '3em 0', textAlign: 'center' }}>
              Llena este formulario si necesitas información acerca del estado de tu pedido, información relacionada con el proceso de compra online o si tienes una propuesta para trabajar juntos.
          </p>

            <div className={styles.inputs_content}>
              <TextField
                required
                value={dataForm.Name}
                className={styles.subscribe_input}
                onChange={event => changeValDataForm('Name', event.target.value)}
                label="Nombre" />
              <TextField
                required
                type="email"
                value={dataForm.Email}
                className={styles.subscribe_input}
                onChange={event => changeValDataForm('Email', event.target.value)}
                label="Correo" />
              <TextField
                value={dataForm.Message}
                className={styles.subscribe_input}
                onChange={event => changeValDataForm('Message', event.target.value)}
                label="Mensaje"
                multiline rows={3}
                rowsMax={4} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ width: '100%' }} variant="contained" color="primary" type="submit" className={styles.btn_submit}
                onClick={(e) => onSubmit(e)}>Enviar</Button>
            </div>
          </form>


          {/* <div className={styles.map_container}>
            <img src="https://ep01.epimg.net/tecnologia/imagenes/2019/11/13/actualidad/1573658897_566202_1573659544_noticia_normal.jpg" alt="" />
          </div> */}
        </div>
      </div>

    </Fragment>
  )
}

function mapStateToProps(state) {
  const { menu } = state
  return { menu: menu.menu }
}

export default connect(mapStateToProps)(Contact)

