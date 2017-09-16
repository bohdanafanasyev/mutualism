import { createStore } from 'redux';
import makeRootReducer from './reducers';

export default (initialState) => {

  const store = createStore( makeRootReducer(), initialState)
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.dispatch(reducers(store.asyncReducers))
    })
  }

  return store
}
