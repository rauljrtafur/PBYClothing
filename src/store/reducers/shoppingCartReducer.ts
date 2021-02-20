// Cada reducer tiene su propio state

import { ADD_PRODUCT, REMOVE_PRODUCT, ADD_QUANTITY_PRODUCT, ADD_PROMOTIONAL_CODE, SET_PRODUCTS, REMOVE_ALL_PRODUCTS, REMOVE_PROMOTIONAL_CODE } from "../types"

const initialState: { products: any[], promotionalCode: any } = {
  products: [],
  promotionalCode: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ALL_PRODUCTS:
      return { ...state, products: [] }
    case ADD_PROMOTIONAL_CODE:
      return { ...state, promotionalCode: action.payload }
    case REMOVE_PROMOTIONAL_CODE:
      return { ...state, promotionalCode: null }
    case SET_PRODUCTS:
      return { ...state, products: action.payload }
    case ADD_PRODUCT:
      const newList = [...state.products, action.payload]
      setLocalSorage(newList)
      return { ...state, products: newList }
    case REMOVE_PRODUCT:
      const { id, talla } = action.payload
      const productsFiltered = state.products.filter(item => item.Id_Producto !== id || item.Talla !== talla)
      setLocalSorage(productsFiltered)
      return { ...state, products: productsFiltered }
    case ADD_QUANTITY_PRODUCT:
      const dataProd = action.payload
      const preoductsUpdated = state.products.map(item => {
        if (item.Id_Producto === dataProd.id && item.Talla === dataProd.talla)
          return { ...item, CantidadCompra: dataProd.cantidad }
        return item
      })
      setLocalSorage(preoductsUpdated)
      return { ...state, products: preoductsUpdated }
    default:
      return state
  }
}

const setLocalSorage = (products: any[]) => {
  const strValue = JSON.stringify(products)
  localStorage.setItem('products', strValue);
}