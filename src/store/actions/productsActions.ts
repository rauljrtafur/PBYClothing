import { ADD_PRODUCTS, SET_FILTER_PRODUCTS } from '../types'

// añadir products
export function addProductsAction(products) {
  return (dispatch) => {
    dispatch(addProducts(products))
  }
}

export function setFilterProductsAction(filter: string | null) {
  return (dispatch) => {
    dispatch(setFilterProducts(filter))
  }
}

const addProducts = (products: any[]) => ({
  type: ADD_PRODUCTS,
  payload: products
})

const setFilterProducts = (products: string | null) => ({
  type: SET_FILTER_PRODUCTS,
  payload: products
})