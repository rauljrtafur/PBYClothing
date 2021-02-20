import { ADD_PRODUCTS, SET_FILTER_PRODUCTS } from '../types'
// Cada reducer tiene su propio state
const initialState = {
  products: [],
  filter: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return { ...state, products: action.payload }
    case SET_FILTER_PRODUCTS:
      return { ...state, filter: action.payload }
    default:
      return state
  }
}