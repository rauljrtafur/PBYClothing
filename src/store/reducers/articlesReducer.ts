// Cada reducer tiene su propio state

import { ADD_ARTICLES } from "../types"

const initialState = {
  articles: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLES:
      return { ...state, articles: action.payload }
    default:
      return state
  }
}