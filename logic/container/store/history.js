// Constant
export const HISTORY_UPDATE = 'HISTORY_UPDATE';


// Action
export function historyUpdate(history) {
  return {
    type: HISTORY_UPDATE,
    payload: history
  }
}


// Action creator
export const updateHistory = ({ dispatch }) => {
  return (historyRecord) => dispatch(historyUpdate(historyRecord))
}


// Reducer
export default function historyReducer (state = [], action) {
  return action.type === HISTORY_UPDATE
    ? [...state, action.payload]
    : state
}
