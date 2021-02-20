import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import articlesReducer from './articlesReducer'
import menuReducer from './menuReducer'
import shoppingCartReducer from './shoppingCartReducer'
import sessionReducer from './sessionReducer'

export default combineReducers({
  products: productsReducer,
  articles: articlesReducer,
  menu: menuReducer,
  shoppingCart: shoppingCartReducer,
  session: sessionReducer
})