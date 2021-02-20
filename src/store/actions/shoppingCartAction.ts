import { ADD_PRODUCT, REMOVE_PRODUCT, ADD_QUANTITY_PRODUCT, ADD_PROMOTIONAL_CODE, SET_PRODUCTS, REMOVE_ALL_PRODUCTS } from '../types'

// añadir products
export function addProductAction(product) {
  return (dispatch) => { dispatch(addProcuct(product)) }
}

export function setProductsAction(products) {
  return (dispatch) => { dispatch(setProducts(products)) }
}

export function removeProductAction(id, talla) {
  return (dispatch) => { dispatch(removeProcuct(id, talla)) }
}

export function removeAllProductsAction() {
  return (dispatch) => { dispatch(removeProducts()) }
}

export function addQuantityProductAction(id, talla, cantidad) {
  return (dispatch) => { dispatch(addQuantityProduct(id, talla, cantidad)) }
}

export function addPromotionalCodeAction(code, discountValue) {
  return (dispatch) => { dispatch(addPromotionalCode(code, discountValue)) }
}

export function removePromotionalCodeAction() {
  return (dispatch) => { dispatch(removePromotionalCode()) }
}

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products
})

const addProcuct = (product) => ({
  type: ADD_PRODUCT,
  payload: product
})

const removeProcuct = (id, talla) => ({
  type: REMOVE_PRODUCT,
  payload: { id, talla }
})

const addQuantityProduct = (id, talla, cantidad) => ({
  type: ADD_QUANTITY_PRODUCT,
  payload: { id, talla, cantidad }
})

const addPromotionalCode = (code, discountValue) => ({
  type: ADD_PROMOTIONAL_CODE,
  payload: { code, discountValue }
})

const removePromotionalCode = () => ({
  type: ADD_PROMOTIONAL_CODE,
  payload: null
})

const removeProducts = () => ({
  type: REMOVE_ALL_PRODUCTS,
  payload: []
})