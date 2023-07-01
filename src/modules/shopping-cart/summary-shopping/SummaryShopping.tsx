import React, { useState, useEffect } from "react";
import styles from "./SummaryShopping.module.scss";

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { PbyService } from "../../../services/pby-services";
import { toast } from "react-toastify";

// Redux
import { addPromotionalCodeAction } from "../../../store/actions/shoppingCartAction";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

const SummaryShopping = ({
  history,
  showConditions = true,
  totalPrice = 0,
  promotionalCode,
  onBuy,
  promDisabled = false,
  email,
  onCitySelected = true,
  shippingPrice = 0,
}: any) => {
  const dispatch = useDispatch();

  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [descuento, setDescuento] = useState(0);
  const [fieldPromotionalCode, setFieldPromotionalCode] = useState("");

  useEffect(() => {
    if (!promotionalCode) return;
    setDescuento(promotionalCode.discountValue);
    setFieldPromotionalCode(promotionalCode.code);
  }, [promotionalCode]);

  const validationCode = (code: string) => {
    PbyService.validationCode(code, email).then((response) => {
      if (!response.Status) {
        toast.warning("El código ingresado es inválido");
        return;
      }
      dispatch(
        addPromotionalCodeAction(
          response.PromotionalCode,
          response.PercentValue
        )
      );
      toast.success(`Codigo aplicado exitosamente`);
    });
  };

  return (
    <div className={styles.summary_content}>
      <h5>Resumen</h5>
      {!promDisabled ? (
        <div className={styles.line_summary}>
          <div className={styles.data}>
            <span className={styles.label}>¿Tienes un código promocional?</span>
          </div>
          <div>
            <TextField
              disabled={promDisabled}
              label="Código"
              value={fieldPromotionalCode}
              onChange={(e) => {
                setFieldPromotionalCode(e.target.value);
              }}
              onBlur={(e) => {
                const val = e.target.value;
                if (!val) return;
                validationCode(val);
              }}
            />
          </div>
          {/* <span>$ 240.000</span> */}
        </div>
      ) : null}

      <div className={styles.line_summary}>
        <div className={styles.data}>
          <span className={styles.label}>
            Subtotal
            {/* <span className="material-icons tooltipped" data-position="bottom" data-tooltip="Ayuda">help</span> */}
          </span>
        </div>
        <NumberFormat
          value={totalPrice}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>

      <div className={styles.line_summary}>
        <div className={styles.data}>
          <span className={styles.label}>
            Gastos de envío y gestión estimados
            {/* <span className="material-icons tooltipped" data-position="bottom" data-tooltip="Ayuda">help</span> */}
          </span>
        </div>
        <NumberFormat
          value={shippingPrice}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>

      {/* <div className={styles.line_summary}>
        <div className={styles.data}>
          <span className={styles.label}>Impuestos estimados</span>
        </div>
        <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      </div> */}

      {promotionalCode ? (
        <div className={styles.line_summary}>
          <div className={styles.data}>
            <span className={styles.label}>
              Descuento aplicado (-{promotionalCode.discountValue}%)
            </span>
          </div>
          <NumberFormat
            value={-(totalPrice * promotionalCode.discountValue) / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>
      ) : null}

      <div className={styles.total}>
        <span className={styles.label}>Total</span>
        <NumberFormat
          className={styles.total_price}
          value={
            Number(shippingPrice) + totalPrice - (totalPrice * descuento) / 100
          }
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>

      {showConditions && (
        <FormControlLabel
          control={
            <Checkbox
              value={aceptaTerminos}
              onChange={(e, newVal) => setAceptaTerminos(newVal)}
              name="gilad"
              color="primary"
            />
          }
          label={
            <span>
              Acepto Términos y condiciones y política de tratamiento de datos
            </span>
          }
        />
      )}

      <div style={{ display: "flex" }}>
        <Button
          color="primary"
          style={{ width: "100%", marginTop: "1em" }}
          disabled={!totalPrice || (showConditions && !aceptaTerminos)}
          onClick={() => {
            if (!showConditions) history.push({ pathname: "/datos-pago" });
            else onBuy(true);
          }}
          variant="contained"
        >
          {!showConditions ? "Continuar" : "Pago online"}
        </Button>

        {showConditions ? (
          <Button
            color="primary"
            style={{ width: "100%", marginTop: "1em", marginLeft: "1em" }}
            disabled={
              !totalPrice ||
              (showConditions && !aceptaTerminos) ||
              !onCitySelected
            }
            onClick={() => {
              onBuy(false);
            }}
            variant="contained"
          >
            Contra entrega
          </Button>
        ) : null}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { shoppingCart } = state;
  return { promotionalCode: shoppingCart.promotionalCode };
}

export default connect(mapStateToProps)(SummaryShopping);
