// Cada reducer tiene su propio state

import { ADD_MENU } from "../types"

const initialState = {
  menu: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MENU:
      return { ...state, menu: action.payload }
    default:
      return state
  }
}