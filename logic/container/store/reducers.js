import { combineReducers } from 'redux';
import historyReducer from './history';
import storeSlides from './slides';


// Rout Reducer
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    history: historyReducer,
    slides: storeSlides,
    ...asyncReducers
  })
}


// Inject Reduces
export const injectReducer = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}


export default makeRootReducer;
