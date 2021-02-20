// Cada reducer tiene su propio state

import { SET_SESSION, SET_SHOW_LOGIN } from "../types"

const initialState = {
  session: null,
  showLogin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      localStorage.setItem('session', JSON.stringify(action.payload));
      return { ...state, session: action.payload }
    case SET_SHOW_LOGIN:
      return { ...state, showLogin: action.payload }
    default:
      return state
  }
}