import { combineReducers } from 'redux'
import setReducer from './setReducer'

export default combineReducers({
  sets: setReducer
})
