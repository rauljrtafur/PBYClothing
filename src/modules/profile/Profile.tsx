import React, { useEffect, useState } from 'react'

import styles from './Profile.module.scss'

import Button from '@material-ui/core/Button';
import { FormControl, FormLabel, TextField } from '@material-ui/core'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';


import { connect } from 'react-redux'
import { Autocomplete } from '@material-ui/lab';
import { PbyService } from '../../services/pby-services';
import { toast } from 'react-toastify';
import { typeDocuments } from '../../shared/mockups/type-documents';
import { KeyboardDatePicker } from '@material-ui/pickers/';
import { setSessionAction } from '../../store/actions';
import { useDispatch } from 'react-redux'

// {"PersonId":2,"IdentificationTypeId":47,"Identification":"666666666","BirthDate":"06/01/1991","GenderId":4,"Email":"koz.cac@gmail.com","FirstName":"CAMILO","LastName":"RAMIREZ","Phone":"3173731840","Address":"CLL 156 # 8F - 15","DescriptionAddress":"TORRE 7 APTO 202","Country":"169","City":"856","status":true,"Message":"Usuario autenticado correctamente","TypeUser":19}

function Profile(props) {

  let { session } = props
  const dispatch = useDispatch()

  const [dataForm, setDataForm] = useState<any>({
    IdentificationTypeId: '',
    Identification: '',
    FirstName: '',
    LastName: '',
    Phone: '',
    Direction: '',
    ComplementDirection: '',
    Email: '',
    BirthDate: '',
    GenderId: '',
    CountrySelected: null,
    CitySelected: null,
    IdentificationTypeIdSelected: null,
  })
  const [paises, setPaises] = useState<any[]>([])
  const [ciudades, setCiudades] = useState<any[]>([])

  useEffect(() => {
    getPaises()
    if (!session) return
    if (session.Country) getCiudades(session.Country)
    const typeDocSel = typeDocuments.find(item => item.id == session.IdentificationTypeId)

    const newDataForm = {
      ...dataForm,
      ...session,
      IdentificationTypeIdSelected: typeDocSel || null,
    }

    setDataForm(newDataForm)

  }, [session])

  useEffect(() => {
    if (!paises || paises.length === 0 || !dataForm) return
    const countryFind = paises.find(item => item.Value === dataForm.Country)
    if (countryFind) changeValDataForm('CountrySelected', countryFind)
  }, [paises])

  useEffect(() => {
    if (!ciudades || ciudades.length === 0 || !dataForm) return
    const countryFind = ciudades.find(item => item.Value === dataForm.City)
    if (countryFind) changeValDataForm('CitySelected', countryFind)
  }, [ciudades])

  const changeValDataForm = (name, value) => {
    const newDataForm = {
      ...dataForm,
      [name]: value
    }
    setDataForm({ ...newDataForm })
  }

  const getPaises = () => {
    PbyService.getCountries('').then(countries => {
      setPaises(countries)
    })
  }

  const getCiudades = (countyCode: string) => {
    if (!countyCode) return
    PbyService.getCities(countyCode).then(ciudades => {
      setCiudades(ciudades)
    })
  }


  const onSubmit = () => {
    let isValid = true
    const arrayKeys = ['IdentificationTypeIdSelected', 'Identification', 'FirstName', 'LastName', 'Phone', 'Email', 'Direction', 'ComplementDirection', 'CountrySelected', 'CitySelected', 'BirthDate']
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
    dataForm.Country = dataForm.CitySelected ? dataForm.CountrySelected.Value : ''
    dataForm.City = dataForm.CountrySelected ? dataForm.CitySelected.Value : ''
    dataForm.IdentificationTypeId = dataForm.IdentificationTypeIdSelected ? dataForm.IdentificationTypeIdSelected.id : ''
    PbyService.updatePerson(dataForm).then(response => {
      if (!response) return
      if (!response.status) {
        toast.error(response.Message)
        return
      }
      toast.success('La información se ha actualizado exitosamente')
      //actualizar sesion en local
      dispatch(setSessionAction(dataForm))
      localStorage.setItem('session', JSON.stringify(dataForm));
    })

  }

  return (
    <div className={styles.Profile_container}>
      <h3>Información del perfil</h3>
      <div className={styles.inputs_content}>
        <div className={styles.inputs_col2}>
          <Autocomplete
            options={typeDocuments}
            value={dataForm.IdentificationTypeIdSelected}
            onChange={(e, itemSelected: any) => {
              const value = itemSelected ? itemSelected : null
              changeValDataForm('IdentificationTypeIdSelected', value)
            }}
            getOptionLabel={(option: any) => option.value}
            renderInput={(params) => <TextField {...params} label="Tipo de documento *" />}
          />
          <TextField
            value={dataForm.Identification}
            required
            type="number"
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('Identification', event.target.value)}
            label="No documento" />
        </div>
        <div className={styles.inputs_col2}>
          <TextField
            required
            value={dataForm.FirstName}
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('FirstName', event.target.value)}
            label="Nombre" />
          <TextField
            required
            value={dataForm.LastName}
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('LastName', event.target.value)}
            label="Apellido" />
        </div>
        <div className={styles.inputs_col2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Género</FormLabel>
            <RadioGroup
              row
              name="GenderId"
              value={dataForm.GenderId}
              onChange={event => {
                changeValDataForm('GenderId', Number(event.target.value))
              }}>
              <FormControlLabel value={6} control={<Radio color="primary" />} label="Femenino" />
              <FormControlLabel value={4} control={<Radio color="primary" />} label="Masculino" />
            </RadioGroup>
          </FormControl>

          {/* <TextField
            required
            label="Fecha de nacimiento"
            value={dataForm.BirthDate}
            defaultValue={dataForm.BirthDate}
            // format="DD/MM/YYYY"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={event => changeValDataForm('BirthDate', event.target.value)}
          /> */}

          <KeyboardDatePicker
            autoOk
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            label="Fecha de nacimiento"
            value={dataForm.BirthDate}
            // inputValue={dataForm.BirthDate}
            onChange={date => changeValDataForm('BirthDate', date)}
          />

        </div>

        <div className={styles.inputs_col2}>
          <TextField
            value={dataForm.Phone}
            required
            type="number"
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('Phone', event.target.value)}
            label="Teléfono" />
          <TextField
            value={dataForm.Email}
            required
            disabled
            type="email"
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('Email', event.target.value)}
            label="Correo" />
        </div>

        <div className={styles.inputs_col2}>
          <TextField
            value={dataForm.Address}
            required
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('Address', event.target.value)}
            label="Dirección" />
          <TextField
            value={dataForm.DescriptionAddress}
            required
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('DescriptionAddress', event.target.value)}
            label="Descripción dirección" />
        </div>
        <div className={styles.inputs_col2}>
          <Autocomplete
            options={paises}
            value={dataForm.CountrySelected}
            // defaultValue={dataForm.CodigoPais}
            // style={{ width: '100%' }}
            onChange={(e, itemSelected: any) => {
              const value = itemSelected ? itemSelected : null
              getCiudades(value.Value)
              changeValDataForm('CountrySelected', value)
            }}
            getOptionLabel={(option: any) => option.Text}
            renderInput={(params) => <TextField {...params} label="País *" />}
          />

          <Autocomplete
            options={ciudades}
            value={dataForm.CitySelected}
            onChange={(e, itemSelected: any) => {
              const value = itemSelected ? itemSelected : null
              changeValDataForm('CitySelected', value)
            }}
            getOptionLabel={(option: any) => option.Text}
            renderInput={(params) => <TextField {...params} label="Ciudad *" />}
          />
        </div>

        <Button variant="contained" color="primary" type="submit" className={styles.btn_submit}
          onClick={() => onSubmit()}
        >Guardar Datos</Button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { session } = state
  return { session: session.session }
}

export default connect(mapStateToProps)(Profile)
