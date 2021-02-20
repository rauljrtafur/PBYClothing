import { ADD_MENU } from '../types'

// añadir products
export function addMenuAction(articles) {
  return (dispatch) => { dispatch(addMenu(articles)) }
}

const addMenu = (menu) => ({
  type: ADD_MENU,
  payload: menu
})