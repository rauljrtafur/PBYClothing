import React, { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.scss";

import { ItemShoppingCart } from "./Item-shopping-cart/ItemShoppingCart";
import SummaryShopping from "./summary-shopping/SummaryShopping";

// Redux
import { connect } from "react-redux";
import { getPrecioConDescuento } from "../../shared/utils";

const ShoppingCart = ({ history, products }: any) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    products.forEach((item) => {
      total +=
        item.CantidadCompra *
        getPrecioConDescuento(
          item.Precio,
          item.C__Descuento,
          item.Aplica_Descuento
        );
    });
    setTotalPrice(total);
  }, [products]);

  return (
    <div className={styles.container_shopping_cart}>
      <div className={styles.main_shopping_cart}>
        <div>
          <h4 className={styles.title_section}>Bolsa de compra</h4>
          {products.map((item, i) => (
            <ItemShoppingCart key={i} dataProduct={item} />
          ))}
        </div>
        <SummaryShopping
          history={history}
          showConditions={false}
          totalPrice={totalPrice}
          promDisabled
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { shoppingCart } = state;
  return { products: shoppingCart.products };
}

export default connect(mapStateToProps)(ShoppingCart);
