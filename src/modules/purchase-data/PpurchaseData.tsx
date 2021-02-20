import React, { useState, useEffect } from 'react'
import styles from './PurchaseData.module.scss'

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core'

import SummaryShopping from '../shopping-cart/summary-shopping/SummaryShopping'
import { PbyService } from '../../services/pby-services'
import { toast } from 'react-toastify';

// Redux
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setShowLoginAction, removeAllProductsAction, removePromotionalCodeAction } from '../../store/actions';

const PurchaseData = ({ history, products, session }: any) => {

  const [selectCity, setSelectCity] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [paises, setPaises] = useState<any[]>([])
  const [ciudades, setCiudades] = useState<any[]>([])
  const [dataForm, setDataForm] = useState<any>(
    {
      Correo: '',
      Nombre: '',
      Apellido: '',
      Telefono: '',
      Direccion: '',
      DescripcionDireccion: '',
      CodigoPais: null,
      CodigoCuidad: null,
    })
  const dispatch = useDispatch()

  useEffect(() => {
    let total = 0
    products.forEach(item => {
      total += (item.CantidadCompra * getPrecioConDescuento(item.Precio, item.C__Descuento))
    })
    setTotalPrice(total)
  }, [products])

  useEffect(() => {
    window.scrollTo(0, 0)
    getPaises()
  }, [])

  useEffect(() => {
    if (!session.session || paises.length === 0) return
    const { Email, FirstName, LastName, Phone, Address, DescriptionAddress, Country } = session.session
    let countryFind
    if (Country) {

      getCiudades(Country)
      countryFind = paises.find(item => item.Value === Country)
    }

    setDataForm(
      {
        ...dataForm,
        ...session.session,
        Nombre: FirstName,
        Apellido: LastName,
        Telefono: Phone,
        Direccion: Address,
        DescripcionDireccion: DescriptionAddress,
        Correo: Email,
        CodigoPais: countryFind || null
      }
    )

  }, [session.session, paises])

  useEffect(() => {
    if (!paises || paises.length === 0 || !dataForm) return
    const countryFind = paises.find(item => item.Value === dataForm.Country)
    if (countryFind) changeValDataForm('CodigoPais', countryFind)
  }, [paises])

  useEffect(() => {
    if (!ciudades || ciudades.length === 0 || !dataForm) return
    const countryFind = ciudades.find(item => item.Value === dataForm.City)
    if (countryFind) changeValDataForm('CodigoCuidad', countryFind)
  }, [ciudades])


  const getPrecioConDescuento = (price: number, dto: number) => {
    const finalPrice = price - ((price * dto) / 100)
    return finalPrice
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

  const changeValDataForm = (name, value) => {
    const newDataForm = {
      ...dataForm,
      [name]: value
    }
    setDataForm(newDataForm)
  }

  const changeValSelectCity = (value) => {
    if (value != null) {
      let selectedUponDelivery = value.UponDelivery == "True" ?  true : false;
      setSelectCity(selectedUponDelivery)
    }else{
      setSelectCity(false)
    }
  }

  const onBuy = (OnlinePayment) => {
    let isValid = true
    const arrayKeys = ['Nombre', 'Apellido', 'Telefono', 'DescripcionDireccion', 'Direccion', 'CodigoPais', 'CodigoCuidad', 'Correo']
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

    const formSend = {
      Nombre: dataForm.Nombre,
      Apellido: dataForm.Apellido,
      Telefono: dataForm.Telefono,
      DescripcionDireccion: dataForm.Direccion,
      Direccion: dataForm.DescripcionDireccion,
      Correo: dataForm.Correo,
      CodigoPais: dataForm.CodigoPais.Value,
      CodigoCuidad: dataForm.CodigoCuidad.Value,
      AceptaNovedades: dataForm.AceptaNovedades,
      OnlinePayment,
      PriceDelivery: Number(dataForm.CodigoCuidad ? dataForm.CodigoCuidad.AdditionalValue : 0)
    }


    PbyService.newOrderBuy(formSend).then(response => {
      if (!response.Status) {
        toast.error(response.Messagge || 'No se ha podido realizar la compra')
        return
      }
      let urlRedirect
      toast.success('La compra se ha realizado satisfactoriamente')
      localStorage.removeItem('products');
      dispatch(removeAllProductsAction())
      dispatch(removePromotionalCodeAction())

      if (OnlinePayment) {
        urlRedirect = 'https://www.pbyclothing.com/ResponsePayU/RedirectPayU?claims='
        setTimeout(() => {
          window.location.replace(`${urlRedirect}${response.Messagge}`)
        }, 500);
        return
      }

      history.push({ pathname: `/orden-compra/${response.OrderBuyNumber}` })
    })
  }

  return (
    <div className={styles.purchase_content}>

      <form noValidate>
        <div className={styles.head_contact}>
          <h5>Información de Contacto</h5>
          {!session.session ?
            <span onClick={() => {
              dispatch(setShowLoginAction(true))
            }}>¿Ya tienes una Cuenta? INICIAR SESIÓN</span>
            : null}
        </div>
        <div className={styles.inputs_content}>
          <TextField
            value={dataForm.Correo}
            required
            type={'email'}
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('Correo', event.target.value)}
            label="Correo electrónico o número de telefono móvil" />
          <FormControlLabel
            control={
              <Checkbox
                value={dataForm.AceptaNovedades}
                onChange={(e, newVal) => {
                  changeValDataForm(e.target.name, newVal)
                }}
                name="AceptaNovedades"
                color="primary"
              />
            }
            label="Desea recibir Novedades y Promociones"
          />
        </div>


        <h5>Datos de Envío</h5>
        <div className={styles.inputs_content}>
          <div className={styles.inputs_col2}>
            <TextField
              required
              value={dataForm.Nombre}
              className={styles.subscribe_input}
              onChange={event => changeValDataForm('Nombre', event.target.value)}
              label="Nombre" />
            <TextField
              required
              value={dataForm.Apellido}
              className={styles.subscribe_input}
              onChange={event => changeValDataForm('Apellido', event.target.value)}
              label="Apellido" />
          </div>
          <TextField
            value={dataForm.Telefono}
            required
            type="number"
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('Telefono', event.target.value)}
            label="Teléfono" />
          <TextField
            value={dataForm.Direccion}
            required
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('Direccion', event.target.value)}
            label="Dirección" />
          <TextField
            value={dataForm.DescripcionDireccion}
            required
            className={styles.subscribe_input}
            onChange={event => changeValDataForm('DescripcionDireccion', event.target.value)}
            label="Descripción Dirección" />

          {/* <Select
            label="País"
            >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select> */}
          {/* <TextField className={styles.subscribe_input} select label="País">
            {paises.map((option: any, i) => (
              <MenuItem key={option.Value} value={option.Value}>
              {option.Text}
              </MenuItem>
              ))}
            </TextField> */}
          <Autocomplete
            options={paises}
            value={dataForm.CodigoPais}
            // defaultValue={dataForm.CodigoPais}
            // style={{ width: '100%' }}
            onChange={(e, itemSelected: any) => {
              const value = itemSelected ? itemSelected : null
              getCiudades(value.Value)
              changeValDataForm('CodigoPais', value)
            }}
            getOptionLabel={(option: any) => option.Text}
            renderInput={(params) => <TextField {...params} label="País *" />}
          />

          <Autocomplete
            options={ciudades}
            // defaultValue={{ Text: "COLOMBIA", Value: '169' }}
            value={dataForm.CodigoCuidad}
            // style={{ width: '100%' }}
            onChange={(e, itemSelected: any) => {
              const value = itemSelected ? itemSelected : null
              changeValDataForm('CodigoCuidad', value)
              changeValSelectCity(value)
            }}
            getOptionLabel={(option: any) => option.Text}
            renderInput={(params) => <TextField {...params} label="Ciudad *" />}
          />

        </div>

      </form>

      <SummaryShopping history={history} totalPrice={totalPrice} shippingPrice={dataForm.CodigoCuidad?.AdditionalValue} email={dataForm.Correo} onCitySelected={selectCity} onBuy={(onlinePayment) => onBuy(onlinePayment)} />


    </div>
  )
}

function mapStateToProps(state) {
  const { shoppingCart, session } = state
  return { products: shoppingCart.products, session }
}

export default connect(mapStateToProps)(PurchaseData)