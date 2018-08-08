import { FETCH_SETS, NEW_SET } from '../actions/types'

const initialState = {
  items: [],
  item: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SETS:
      return {
        ...state,
        items: action.payload
      }
    case NEW_SET:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state
  }
}
