import React from "react";
import styles from "./ItemShoppingCart.module.scss";
import { NavLink } from "react-router-dom";

import imagePE1 from "../../../assets/images_pby/ProductoEspecifico/1.jpeg";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

import NumberFormat from "react-number-format";

// React redux
import { useDispatch } from "react-redux";
import {
  removeProductAction,
  addQuantityProductAction,
} from "../../../store/actions";
import { getPrecioConDescuento } from "../../../shared/utils";

export const ItemShoppingCart = (props: any) => {
  const dispatch = useDispatch();
  const { preview = false, dataProduct = {} } = props;

  const removeProductStore = () => {
    dispatch(removeProductAction(dataProduct.Id_Producto, dataProduct.Talla));
  };

  return (
    <div
      className={
        !preview
          ? styles.container_item_shopping
          : styles.container_item_shopping_preview
      }
    >
      <div className={styles.image}>
        <img
          src={dataProduct.Images ? dataProduct.Images.split(",")[0] : ""}
          alt=""
        />
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <strong>Producto</strong>
          <strong>Talla</strong>
          <strong>Cantidad</strong>
          <strong>Precio</strong>
          <strong></strong>
        </div>
        <div className={styles.data_body}>
          <span className={styles.desc_text}>
            {dataProduct.Nombre_Producto} {dataProduct.Sexo}
          </span>
          <span>{dataProduct.Talla}</span>

          {preview ? (
            <span>{dataProduct.CantidadCompra}</span>
          ) : (
            <Select
              value={dataProduct.CantidadCompra}
              onChange={({ target }) => {
                const CantidadCompra = target.value;
                if (CantidadCompra === 0) {
                  removeProductStore();
                  return;
                }
                dispatch(
                  addQuantityProductAction(
                    dataProduct.Id_Producto,
                    dataProduct.Talla,
                    CantidadCompra
                  )
                );
              }}
              label="Cantidad"
            >
              <MenuItem value={0}>
                <em>Eliminar</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
          )}

          {/* <TextInput type="number" value={2} className={styles.quantity} inputClassName={styles.quantity} id={'dee'} /> */}
          {/* <div className={styles.quantity}>
            <input id="first_name" type="number" defaultValue={2} />
          </div> */}

          <NumberFormat
            value={
              dataProduct.CantidadCompra *
              getPrecioConDescuento(
                dataProduct.Precio,
                dataProduct.C__Descuento,
                dataProduct.Aplica_Descuento
              )
            }
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />

          {/* <span>$ </span> */}

          {!preview ? (
            <div
              className={styles.delete_icon}
              onClick={() => removeProductStore()}
            >
              <span>Eliminar</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
