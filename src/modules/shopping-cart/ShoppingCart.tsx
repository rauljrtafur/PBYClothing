import React, { useEffect, useState } from 'react'
import styles from './ShoppingCart.module.scss'

import { ItemShoppingCart } from './Item-shopping-cart/ItemShoppingCart';
import SummaryShopping from './summary-shopping/SummaryShopping';

// Redux
import { connect } from 'react-redux'

const ShoppingCart = ({ history, products }: any) => {

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let total = 0
    products.forEach(item => {
      total += (item.CantidadCompra * getPrecioConDescuento(item.Precio, item.C__Descuento))
    })
    setTotalPrice(total)
  }, [products])

  const getPrecioConDescuento = (price: number, dto: number) => {
    const finalPrice = price - ((price * dto) / 100)
    return finalPrice
  }

  return (

    <div className={styles.container_shopping_cart}>

      <div className={styles.main_shopping_cart}>
        <div>
          <h4 className={styles.title_section}>Bolsa de compra</h4>
          {products.map((item, i) => (
            <ItemShoppingCart key={i} dataProduct={item} />
          ))}
        </div>
        <SummaryShopping history={history} showConditions={false} totalPrice={totalPrice} promDisabled />
      </div>

    </div>
  )
}

function mapStateToProps(state) {
  const { shoppingCart } = state
  return { products: shoppingCart.products }
}

export default connect(mapStateToProps)(ShoppingCart)