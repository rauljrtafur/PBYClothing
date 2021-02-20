import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styles from './PurchaseOrder.module.scss'

import { PbyService } from '../../services/pby-services'
import { useParams } from 'react-router-dom'
import NumberFormat from 'react-number-format'

function PurchaseOrder(props) {

  let { session } = props
  const [order, setOrder] = useState<any>({})
  const params: any = useParams();

  useEffect(() => {
    if (!session) return
    getHistoryProducts(session.PersonId)
  }, [session])

  const getHistoryProducts = (PersonId) => {
    PbyService.OrderBuyHistoryByPerson(PersonId).then(orders => {
      if (!orders) return
      const orderFind = orders.find(item => item.NumeroOrden.toString() === params.id)
      setOrder(orderFind)
    })
  }

  return (
    <div className={styles.Shopping_container}>
      <h3>Orden de Compra</h3>


      <div className={styles.data_container}>
        <div>
          <h4>Pedido #{order.NumeroOrden}</h4>
          <h4>Gracias {order.NombreCliente}</h4>
          <p>Tu pedido esta en estado {order.EstadoOrden}</p>
          <p>Fecha de orden {order.FechaOrden}</p>
          <br /><br />

          <h5>Información del cliente</h5>

          <h4>Información de contacto</h4>
          <p>{order.Email}</p>

          <h4>Dirección de envío</h4>
          <p>{order.NombreCliente + ' ' + order.ApellidoCliente}</p>
          <p>{order.Direccion}</p>
          <p>{order.Phone}</p>
          <p>{order.ComplementoDireccion}</p>
          <p>{`${order.CountryName} - ${order.DeparmentName}`}</p>
          <p>{order.MunicipalityName}</p>

          <h4>Métodos de pago</h4>
          <p>{order.MetodoPago}</p>
        </div>

        <div>
          <div className={styles.row_priceData}>
            <span>Subtotal</span>
            <NumberFormat value={order.PriceTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
          <div className={styles.row_priceData}>
            <span>Envíos</span>
            <NumberFormat value={order.PriceDelivery} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
          <div className={styles.row_priceData}>
            <span>Descuentos</span>
            <NumberFormat value={order.PriceDiscount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
          <br />
          <hr />
          <br />
          <div className={styles.row_priceData}>
            <span>Total</span>
            <NumberFormat value={order.PriceTotal + order.PriceDelivery - order.PriceDiscount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
        </div>
      </div>

      {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}


    </div>
  )
}

function mapStateToProps(state) {
  const { session } = state
  return { session: session.session }
}

export default connect(mapStateToProps)(PurchaseOrder)
