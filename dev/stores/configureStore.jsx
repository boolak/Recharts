import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/index'
import DevTools from '../Tools/DevTools';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    //DevTools.instrument(),
    //applyMiddleware(thunk)
    applyMiddleware(thunkMiddleware)
  )
  return store
}
