import React, { useState } from 'react'
import styles from './Login-modal.module.scss'

import { Button } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ImageCustomModal from '../image-custom-modal/ImageCustomModal'
import { useDispatch } from 'react-redux'
import { setSessionAction } from '../../store/actions';
import { PbyService } from '../../services/pby-services';
import { toast } from 'react-toastify';


const LoginModal = (props: any) => {

  // var session = {
  //   "PersonId": 2,
  //   "IdentificationTypeId": 1,
  //   "Identification": "1018440603",
  //   "GenderId": 4,
  //   "BirthDate": "06/01/1991",
  //   "Email": "koz.cac@gmail.com",
  //   "FirstName": "CAMILO",
  //   "LastName": "RAMIREZ",
  //   "Phone": "3173731840",
  //   "Address": "CLL 156 # 8F - 15",
  //   "DescriptionAddress": "TORRE 7 APTO 202",
  //   "Country": "169",
  //   "City": "521",
  //   "status": true,
  //   "Message": "Usuario autenticado correctamente"
  // }
  const dispatch = useDispatch()

  const { show, onClosed, openRegisterModal } = props
  const [form, setForm] = useState({ user: '', password: '' })
  const handleChange = (event) => {
    const { target: { name, value } } = event
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  const handleSubmit = () => {
    // localStorage.setItem('session', JSON.stringify(session));
    // dispatch(setSessionAction(session))
    // onClosed(true)
    // setForm({ user: '', password: '' })
    PbyService.login(form.user, form.password).then(response => {
      if (!response) return
      if (!response.status) {
        toast.error(response.Message)
        return
      }
      localStorage.setItem('session', JSON.stringify(response));
      dispatch(setSessionAction(response))
      onClosed(true)
      setForm({ user: '', password: '' })
    })
  }

  return (
    <ImageCustomModal show={show} onClosed={() => onClosed(false)}>
      <h5 style={{ margin: 0 }}>INICIAR SESIÓN</h5>

      <ValidatorForm onSubmit={handleSubmit}>
        <div className={styles.inputs_content}>
          <TextValidator
            label="Usuario"
            onChange={handleChange}
            name="user"
            type="text"
            validators={['required']}
            errorMessages={['Usuario requerido']}
            value={form.user}
          />
          <TextValidator
            label="Contraseña"
            onChange={handleChange}
            name="password"
            type="password"
            validators={['required']}
            errorMessages={['Contraseña requerida']}
            value={form.password}
          />
        </div>
        <div className={styles.buttons_content}>
          <Button variant="contained" color="primary" type="submit">Iniciar sesión</Button>
          <Button variant="contained" color="primary" onClick={() => openRegisterModal()}>Registrarse</Button>
        </div>
      </ValidatorForm>
    </ImageCustomModal>
  )
}

export default LoginModal


