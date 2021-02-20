import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'

// console.log(process.env.NODE_ENV);


const store = createStore(
  reducer,
  compose(applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (a: any) => a
  )
)

export default store