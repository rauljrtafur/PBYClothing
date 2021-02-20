import React, { useEffect, useState } from 'react'

import styles from './shopping-history.module.scss'
import { connect } from 'react-redux'
import { PbyService } from '../../services/pby-services'
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import NumberFormat from 'react-number-format'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';

// import { FaSpinner } from "react-icons/fa";

function ShoppingHistory(props) {

  const history = useHistory()

  let { session } = props

  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    if (!session) return
    getHistoryProducts(session.PersonId)
  }, [session])

  const getHistoryProducts = (PersonId) => {
    PbyService.OrderBuyHistoryByPerson(PersonId).then(products => {
      if (!products) return
      setProducts(products)
    })
  }

  return (
    <div className={styles.Shopping_container}>
      <h3>Compras realizadas</h3>
      <TableContainer className={styles.main_table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Número orden</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Método de pago</TableCell>
              <TableCell align="center">Medio orden</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Fecha orden</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((order, i) => (
              <ItemRow key={i} order={order} history={history} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

function ItemRow({ order, history }) {

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const toogleOpen = () => {
    if (products.length > 0) {
      setOpen(!open)
      return
    }

    PbyService.listProductByOrderBuy(order.NumeroOrden).then(products => {
      if (!products) return
      setProducts(products)
      setOpen(!open)
    })
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" onClick={() => toogleOpen()}>
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{order.NumeroOrden}</TableCell>
        <TableCell align="center">{order.EstadoOrden}</TableCell>
        <TableCell align="center">{order.MetodoPago}</TableCell>
        <TableCell align="center">
          <NumberFormat value={order.PriceTotal + order.PriceDelivery - order.PriceDiscount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </TableCell>
        <TableCell align="center">{order.MedioOrden}</TableCell>
        <TableCell align="center">{order.DescripcionOrden}</TableCell>
        <TableCell align="center">{order.FechaOrden}</TableCell>
        <TableCell align="center">
          <Button variant="contained" color="primary" type="submit"
            onClick={() => history.push({ pathname: `/orden-compra/${order.NumeroOrden}` })}
          >Ver Detalle</Button>
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={0}>
              <Typography variant="h6" gutterBottom component="div">Productos</Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="center">Código</TableCell>
                    <TableCell align="center">Color</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Garantía</TableCell>
                    <TableCell align="center">Precio</TableCell>
                    <TableCell align="center">Talla</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product: any, i) => (
                    <TableRow key={i}>
                      <TableCell>{product.NombreProducto}</TableCell>
                      <TableCell align="center">{product.CodigoProducto}</TableCell>
                      <TableCell align="center">{product.Color}</TableCell>
                      <TableCell align="center">{product.Cantidad}</TableCell>
                      <TableCell align="center">{product.Garantia}</TableCell>
                      <TableCell align="center">
                        <NumberFormat value={product.Precio} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                      </TableCell>
                      <TableCell align="center">{product.Talla}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}


function mapStateToProps(state) {
  const { session } = state
  return { session: session.session }
}

export default connect(mapStateToProps)(ShoppingHistory)
