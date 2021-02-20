import { ADD_ARTICLES } from '../types'

// añadir products
export function addArticlesAction(articles) {
  return (dispatch) => { dispatch(addArticles(articles)) }
}

const addArticles = (articles) => ({
  type: ADD_ARTICLES,
  payload: articles
})